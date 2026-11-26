"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { SearchInput } from "./search-input";
import { useAuth } from "@clerk/nextjs";
import { isTeacher } from "@/lib/teacher";
import { Suspense } from "react";
import Link from "next/link";

export const NavbarRoutes = () => {
    const { userId } = useAuth();
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.startsWith("/courses");
    const isSearchPage = pathname === "/search";

    return (
        <>
        {isSearchPage && (
            <div className="hidden md:block">
                <Suspense fallback={null}>
                    <SearchInput />
                </Suspense>
            </div>
        )}
        
        <div className="flex gap-x-2 ml-auto">
            {isTeacherPage || isCoursePage ? (
                <Link href="/">
                    <Button size="sm" variant="ghost">
                        <LogOut className="h-4 w-4 mr-2" />
                        Exit
                    </Button>
                </Link>
            ) : isTeacher(userId) ? (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="ghost">
                        Teacher mode
                    </Button>
                </Link>
            ) : null}
            <UserButton />

        </div>
        </>
    )
}