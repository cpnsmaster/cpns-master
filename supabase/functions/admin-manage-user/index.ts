import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":
    "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  // ================================
  // HANDLE PREFLIGHT
  // ================================

  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    // ================================
    // VALIDASI AUTHORIZATION
    // ================================

    const authHeader =
      req.headers.get("Authorization");

    if (!authHeader) {
      return new Response(
        JSON.stringify({
          error:
            "Authorization header tidak ditemukan",
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        },
      );
    }


    // ================================
    // CLIENT USER
    // ================================

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


    // ================================
    // VERIFIKASI USER
    // ================================

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
      return new Response(
        JSON.stringify({
          error:
            "Unauthorized",
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        },
      );
    }


    // ================================
    // CLIENT ADMIN
    // ================================

    const supabaseAdmin =
      createClient(
        Deno.env.get(
          "SUPABASE_URL",
        )!,
        Deno.env.get(
          "SUPABASE_SERVICE_ROLE_KEY",
        )!,
      );


    // ================================
    // CEK ROLE ADMIN
    // ================================

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
      return new Response(
        JSON.stringify({
          error:
            "Forbidden",
        }),
        {
          status: 403,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        },
      );
    }


    // ================================
    // BACA REQUEST
    // ================================

    const {
      action,
      user_id,
      role,
      status,
    } =
      await req.json();


    if (
      !action ||
      !user_id
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Action dan user_id wajib diisi",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        },
      );
    }


    // ================================
    // PROTEKSI DIRI SENDIRI
    // ================================

    if (
      user_id ===
      currentUser.id
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Anda tidak dapat mengubah akun sendiri melalui fitur ini",
        }),
        {
          status: 403,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        },
      );
    }


    // ================================
    // UPDATE ROLE
    // ================================

    if (
      action ===
      "update_role"
    ) {

      if (
        role !==
          "user" &&
        role !==
          "admin"
      ) {
        return new Response(
          JSON.stringify({
            error:
              "Role tidak valid",
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type":
                "application/json",
            },
          },
        );
      }


      const {
        error,
      } =
        await supabaseAdmin
          .from("profiles")
          .update({
            role,
            updated_at:
              new Date().toISOString(),
          })
          .eq(
            "id",
            user_id,
          );


      if (error) {
        throw error;
      }


      return new Response(
        JSON.stringify({
          message:
            "Role user berhasil diubah",
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        },
      );
    }


    // ================================
    // UPDATE STATUS
    // ================================

    if (
      action ===
      "update_status"
    ) {

      if (
        status !==
          "active" &&
        status !==
          "inactive"
      ) {
        return new Response(
          JSON.stringify({
            error:
              "Status tidak valid",
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type":
                "application/json",
            },
          },
        );
      }


      const {
        error,
      } =
        await supabaseAdmin
          .from("profiles")
          .update({
            status,
            updated_at:
              new Date().toISOString(),
          })
          .eq(
            "id",
            user_id,
          );


      if (error) {
        throw error;
      }


      return new Response(
        JSON.stringify({
          message:
            "Status user berhasil diubah",
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        },
      );
    }


    // ================================
    // ACTION TIDAK VALID
    // ================================

    return new Response(
      JSON.stringify({
        error:
          "Action tidak dikenali",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      },
    );


  } catch (error) {

    console.error(
      "admin-manage-user error:",
      error,
    );


    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      },
    );
  }
});