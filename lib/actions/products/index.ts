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
  return JSON.parse(JSON.stringify(result));
}

export async function getProducts(userId: string) {
  const supabase = createClient();
  const result = await supabase.from("Products").select().eq("user_id", userId);
  return JSON.parse(JSON.stringify(result));
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
  return JSON.parse(JSON.stringify(result));
}

export async function deleteProduct(productId: number) {
  const supabase = createClient();
  const result = await supabase
    .from("Products")
    .delete()
    .eq("id", productId)
    .select("*")
    .single();
  return JSON.parse(JSON.stringify(result));
}
