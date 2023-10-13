"use client";
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'

export default function NotFound() {
    const pathname = usePathname()
    redirect("https://r.korho.fi" + (pathname || "/"))
}