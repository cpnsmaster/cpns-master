import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

Deno.serve(async (req: Request) => {
  // Menangani preflight request dari browser
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    // ============================================
    // 1. Ambil Authorization Header
    // ============================================

    const authHeader = req.headers.get("Authorization");

    console.log("Authorization exists:", Boolean(authHeader));

    if (!authHeader) {
      return jsonResponse(
        {
          error: "Authorization header tidak ditemukan",
        },
        401,
      );
    }

    // ============================================
    // 2. Client untuk memverifikasi user
    // ============================================

    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      },
    );

    // ============================================
    // 3. Ambil user dari JWT
    // ============================================

    const {
      data: { user: currentUser },
      error: userError,
    } = await supabaseUser.auth.getUser();

    console.log({
      userError,
      currentUserId: currentUser?.id,
    });

    if (userError || !currentUser) {
      return jsonResponse(
        {
          error: "Unauthorized",
          detail: userError?.message ?? "User tidak ditemukan",
        },
        401,
      );
    }

    // ============================================
    // 4. Client dengan SERVICE ROLE KEY
    // ============================================

    const serviceRoleKey = Deno.env.get("CPNS_MASTER_SERVICE_ROLE_KEY");

    console.log("Admin key exists:", Boolean(serviceRoleKey));

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      serviceRoleKey!,
    );

    // ============================================
    // 5. Cek role user yang sedang login
    // ============================================

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("role, status")
      .eq("id", currentUser.id)
      .single();

    console.log({
      profile,
      profileError,
    });

    if (profileError || profile?.role !== "super_admin") {
      return jsonResponse(
        {
          error: "Forbidden",
          detail: profileError?.message ?? "User bukan super_admin",
          profile,
        },
        403,
      );
    }

    // ============================================
    // 6. Ambil data user baru
    // ============================================

    const { email, password, full_name, role = "user" } = await req.json();

    // ============================================
    // 7. Validasi input
    // ============================================

    if (!email || !password || !full_name) {
      return jsonResponse(
        {
          error: "Email, password, dan nama lengkap wajib diisi",
        },
        400,
      );
    }

    // Tidak boleh membuat super_admin
    // melalui UI
    if (role === "super_admin") {
      return jsonResponse(
        {
          error: "Tidak dapat membuat super_admin melalui aplikasi",
        },
        403,
      );
    }

    // ============================================
    // 8. Buat user di Supabase Auth
    // ============================================

    const { data: newUser, error: createUserError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (createUserError) {
      throw createUserError;
    }

    if (!newUser.user) {
      throw new Error("User gagal dibuat");
    }

    // ============================================
    // 9. Buat / update profile
    // ============================================

    const { error: profileUpsertError } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: newUser.user.id,
        full_name,
        role,
        status: "active",
      });

    if (profileUpsertError) {
      throw profileUpsertError;
    }

    // ============================================
    // 10. Response berhasil
    // ============================================

    return jsonResponse(
      {
        message: "User berhasil dibuat",
        user: {
          id: newUser.user.id,
          email: newUser.user.email,
        },
      },
      201,
    );
  } catch (error) {
    console.error("Admin create user error:", error);

    return jsonResponse(
      {
        error: error instanceof Error ? error.message : "Terjadi kesalahan",
      },
      500,
    );
  }
});
