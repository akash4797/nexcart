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
import { ChevronDownIcon } from "lucide-react"; // Import an arrow icon

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Products", href: "/admin/products", icon: PackageIcon },
    {
      name: "Procurement",
      href: "#",
      icon: RecycleIcon,
      subcategories: [
        { name: "Suppliers", href: "/admin/suppliers" },
        { name: "Purchase Orders", href: "/admin/purchases" },
      ],
    },
    { name: "Users", href: "/admin/users", icon: UsersIcon },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCartIcon },
    { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
  ];

  const [expandedCategories, setExpandedCategories] = React.useState(() => {
    const initialExpanded = {};
    navigation.forEach((item) => {
      if (item.subcategories?.some((sub) => pathname === sub.href)) {
        Object.assign(initialExpanded, { [item.name]: true });
      }
    });
    return initialExpanded;
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !Boolean(prev[category as keyof typeof prev]),
    }));
  };

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
              const isExpanded =
                expandedCategories[
                  item.name as keyof typeof expandedCategories
                ];
              return (
                <div key={item.name} className="w-full">
                  <div className="flex items-center justify-between">
                    <Link
                      onClick={() => {
                        if (!item.subcategories) setOpen(false);
                        toggleCategory(item.name);
                      }}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all w-full",
                        isActive
                          ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                          : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </div>
                      {item.subcategories && (
                        <ChevronDownIcon
                          className={cn(
                            "transition-transform",
                            isExpanded ? "rotate-180" : "rotate-0"
                          )}
                        />
                      )}
                    </Link>
                  </div>
                  {isExpanded && item.subcategories && (
                    <div className="mt-2 flex flex-col gap-2">
                      {item.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          onClick={() => setOpen(false)}
                          href={sub.href}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-lg transition-all w-full",
                            pathname === sub.href
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                              : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
                          )}
                        >
                          <div className="ml-12">{sub.name}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
