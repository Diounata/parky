"use client";
import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface LinkProps {
  name: string;
  href: string;
}

export function DynamicBreadcrumb() {
  const pathnames = window ? window.location.pathname.split("/") : [];
  pathnames.shift();

  const links = pathnames.reduce<LinkProps[]>((array, pathname) => {
    const previousPathname =
      array.length > 0 ? array[array.length - 1].href : "";

    array.push({
      name: pathname[0].toUpperCase() + pathname.slice(1).replaceAll(/-/g, " "),
      href: previousPathname + "/" + pathname,
    });

    return array;
  }, []);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map(({ name, href }, index) =>
          index === links.length - 1 ? (
            <BreadcrumbItem key={name}>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={name}>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link href={href}>{name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className="hidden md:block" />
            </Fragment>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
