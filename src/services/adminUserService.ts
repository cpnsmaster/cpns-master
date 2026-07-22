import { supabase } from "../lib/supabase";

export interface CreateUserPayload {
  email: string;
  password: string;
  full_name: string;
  role: "user" | "admin";
}

export interface AdminUser {
  id: string;
  email: string | undefined;
  full_name: string | null;
  role: "user" | "admin" | "super_admin";
  status: "active" | "inactive";
  created_at: string;
}

export interface ManageUserPayload {
  action: "update_role" | "update_status";

  user_id: string;

  role?: "user" | "admin";

  status?: "active" | "inactive";
}

export async function createUserByAdmin(payload: CreateUserPayload) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User belum login");
  }

  const { data, error } = await supabase.functions.invoke("admin-create-user", {
    body: payload,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    console.error("Edge Function error:", error);

    throw error;
  }

  return data;
}

export async function getAllUsers() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User belum login");
  }

  const { data, error } = await supabase.functions.invoke("admin-list-users", {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    console.error("Get users error:", error);

    throw error;
  }

  return data.users as AdminUser[];
}

export async function manageUser(payload: ManageUserPayload) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User belum login");
  }

  const { data, error } = await supabase.functions.invoke("admin-manage-user", {
    body: payload,

    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    console.error("Manage user error:", error);

    throw error;
  }

  return data;
}
