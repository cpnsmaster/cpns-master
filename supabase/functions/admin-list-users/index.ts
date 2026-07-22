import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
) {
  return new Response(
    JSON.stringify(body),
    {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type":
          "application/json",
      },
    },
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    // ============================================
    // 1. Verifikasi JWT user yang sedang login
    // ============================================

    const authHeader =
      req.headers.get("Authorization");

    if (!authHeader) {
      return jsonResponse(
        {
          error:
            "Authorization header tidak ditemukan",
        },
        401,
      );
    }

    const supabaseUser =
      createClient(
        Deno.env.get(
          "SUPABASE_URL",
        )!,
        Deno.env.get(
          "SUPABASE_ANON_KEY",
        )!,
        {
          global: {
            headers: {
              Authorization:
                authHeader,
            },
          },
        },
      );

    const {
      data: {
        user: currentUser,
      },
      error: userError,
    } =
      await supabaseUser.auth.getUser();

    if (
      userError ||
      !currentUser
    ) {
      return jsonResponse(
        {
          error: "Unauthorized",
        },
        401,
      );
    }

    // ============================================
    // 2. Client Admin
    // ============================================

    const serviceRoleKey =
      Deno.env.get(
        "CPNS_MASTER_SERVICE_ROLE_KEY",
      );

    const supabaseAdmin =
      createClient(
        Deno.env.get(
          "SUPABASE_URL",
        )!,
        serviceRoleKey!,
      );

    // ============================================
    // 3. Cek role super_admin
    // ============================================

    const {
      data: profile,
      error: profileError,
    } =
      await supabaseAdmin
        .from("profiles")
        .select("role")
        .eq(
          "id",
          currentUser.id,
        )
        .single();

    if (
      profileError ||
      profile?.role !==
        "super_admin"
    ) {
      return jsonResponse(
        {
          error: "Forbidden",
        },
        403,
      );
    }

    // ============================================
    // 4. Ambil semua user Auth
    // ============================================

    const {
      data: usersData,
      error: usersError,
    } =
      await supabaseAdmin.auth.admin
        .listUsers();

    if (usersError) {
      throw usersError;
    }

    // ============================================
    // 5. Ambil semua profile
    // ============================================

    const {
      data: profiles,
      error:
        profilesError,
    } =
      await supabaseAdmin
        .from("profiles")
        .select(
          "id, full_name, role, status, created_at, updated_at",
        );

    if (profilesError) {
      throw profilesError;
    }

    // ============================================
    // 6. Gabungkan Auth User + Profile
    // ============================================

    const users =
      usersData.users.map(
        (authUser) => {
          const profile =
            profiles?.find(
              (item) =>
                item.id ===
                authUser.id,
            );

          return {
            id: authUser.id,
            email:
              authUser.email,
            full_name:
              profile?.full_name ??
              null,
            role:
              profile?.role ??
              "user",
            status:
              profile?.status ??
              "active",
            created_at:
              authUser.created_at,
          };
        },
      );

    return jsonResponse(
      {
        users,
      },
      200,
    );
  } catch (error) {
    console.error(
      "Admin list users error:",
      error,
    );

    return jsonResponse(
      {
        error:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan",
      },
      500,
    );
  }
});