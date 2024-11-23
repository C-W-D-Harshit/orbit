"use client";

import { usePathname } from "next/navigation";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { generateBreadcrumbs } from "@/utils/breadcrumb-utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <HomeIcon className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRightIcon className="h-4 w-4" />
        </BreadcrumbSeparator>
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem key={breadcrumb.href}>
            {index < breadcrumbs.length - 1 ? (
              <>
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbLink>
                <BreadcrumbSeparator>
                  <ChevronRightIcon className="h-4 w-4" />
                </BreadcrumbSeparator>
              </>
            ) : (
              <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
