"use server";

import { createClient } from "@/supabase/server";
import { TablesInsert, TablesUpdate } from "@/supabase/types";

export async function createProduct(product: TablesInsert<"Products">) {
  const supabase = createClient();
  const result = await supabase
    .from("Products")
    .insert(product)
    .select("*")
    .single();
  return result;
}

export async function getProducts(projectId: string) {
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
  return result;
}

export async function deleteProduct(productId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Products")
    .delete()
    .eq("id", productId)
    .select("*")
    .single();
  return result;
}
