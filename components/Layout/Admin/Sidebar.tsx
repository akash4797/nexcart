"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  HomeIcon,
  MenuIcon,
  PackageIcon,
  RecycleIcon,
  SettingsIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    {
      name: "Inventory",
      href: "#",
      icon: PackageIcon,
      subcategories: [
        { name: "Stock Overview", href: "/admin/inventory" },
        { name: "Stock Logs", href: "/admin/stocklogs" },
      ],
    },
    {
      name: "Procurement",
      href: "#",
      icon: RecycleIcon,
      subcategories: [
        { name: "Products", href: "/admin/products" },
        { name: "Suppliers", href: "/admin/suppliers" },
        { name: "Categories", href: "/admin/categories" },
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
          <SheetTitle className="allenoire-font">NEXCART</SheetTitle>
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
                        "flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all w-full text-[14px]",
                        isActive
                          ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                          : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </div>
                      {item.subcategories && (
                        <ChevronDownIcon
                          className={cn(
                            "transition-transform",
                            isExpanded ? "rotate-180" : "rotate-0",
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
                            "block py-2 text-[12px] rounded-lg transition-all w-full",
                            pathname === sub.href
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                              : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400",
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
