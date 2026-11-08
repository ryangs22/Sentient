import React from "react";
import { checkUser } from "@/actions/check-user";
import { redirect } from "next/navigation";

const DashboardPage = async() => {
  const user = await checkUser();
  if (!user) redirect("/sign-in");
  
    return (
    <div>Dashboard Page</div>
  );
}

export default DashboardPage;