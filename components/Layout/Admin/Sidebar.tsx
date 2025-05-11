"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  MenuIcon,
  HomeIcon,
  PackageIcon,
  RecycleIcon,
  UsersIcon,
  ShoppingCartIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Products", href: "/admin/products", icon: PackageIcon },
    { name: "Suppliers", href: "/admin/suppliers", icon: RecycleIcon },
    { name: "Users", href: "/admin/users", icon: UsersIcon },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCartIcon },
    { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>NEXCART</SheetTitle>
          <nav className="mt-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  onClick={() => setOpen(false)}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                    isActive
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                      : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
