"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  slug: string;
}

const navItems: NavItem[] = [
  { title: "ToB平台体验设计", slug: "tob-platform" },
  { title: "服务咨询项目", slug: "service-consulting" },
  { title: "智慧出行创新云服务App服务", slug: "smart-mobility" },
  { title: "美的居家产品创新智慧健康社区App", slug: "health-community" },
  { title: "霓日协作办公空间数字体验", slug: "collaboration-system" },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeSlug, setActiveSlug] = useState("");

  useEffect(() => {
    const currentSlug = pathname.split("/").pop() || "";
    setActiveSlug(currentSlug);
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      {/* 左侧导航 */}
      <nav className="w-64 border-r border-gray-200 dark:border-gray-700 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.slug}
            href={`/docs/${item.slug}`}
            className={`block p-2 rounded-md transition-colors ${
              activeSlug === item.slug
                ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* 右侧内容 */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
