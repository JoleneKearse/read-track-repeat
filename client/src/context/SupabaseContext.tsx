import React, { createContext, useContext, ReactNode } from "react";
import { config } from "../config";
import { createClient } from "@supabase/supabase-js";

interface SupabaseProviderProps {
  children?: ReactNode;
}

const SupabaseClient = createClient(config.supabaseUrl, config.supabaseAnonKey);
const SupabaseContext = createContext(SupabaseClient);
export const useSupabase = () => useContext(SupabaseContext);
export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children,
}) => {
  return (
    <SupabaseContext.Provider value={SupabaseClient}>
      {children}
    </SupabaseContext.Provider>
  );
};
