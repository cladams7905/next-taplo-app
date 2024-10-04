"use server";

import { createClient } from "@/lib/supabase/server";
import { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/types";
import { revalidatePath } from "next/cache";

export async function createProduct(product: TablesInsert<"Products">) {
  const supabase = createClient();
  const result = await supabase
    .from("Products")
    .insert(product)
    .select("*")
    .single();
  revalidatePath(`/dashboard/project/${product.project_id}/create`, "layout");
  return result;
}

export async function getProducts(projectId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Products")
    .select()
    .eq("project_id", projectId);
  return result;
}

export async function updateProduct(
  productId: number,
  product: TablesUpdate<"Products">
) {
  const supabase = createClient();
  const result = await supabase
    .from("Products")
    .update(product)
    .eq("id", productId)
    .select("*")
    .single();
  revalidatePath(`/dashboard/project/${product.project_id}/create`, "layout");
  return result;
}

export async function deleteProduct(product: Tables<"Products">) {
  const supabase = createClient();
  const result = await supabase
    .from("Products")
    .delete()
    .eq("id", product.id)
    .select("*")
    .single();
  revalidatePath(`/dashboard/project/${product.project_id}/create`, "layout");
  return result;
}
