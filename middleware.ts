import { NextRequest,NextResponse } from "next/server";
import {auth} from "@/auth";

const ProtectedRoutes = ["/myreservation","/checkout","/admin"];
// cegah user akses route berikut kecuali admin

export async function middleware(request:NextRequest){
    const session = await auth();
    const isLoggedIn = !!session?.user;
    const role = session?.user.role;
    const {pathname} = request.nextUrl;
    if(!isLoggedIn && ProtectedRoutes.some((route)=>pathname.startsWith(route))) { // jika user belum login dan mau akses ke protected route, kembalikan ke sign in
        return NextResponse.redirect(new URL("/signin",request.url))
    }
    if(isLoggedIn && role !=="admin" && pathname.startsWith("/admin")){ // tidak bisa akses admin jika role bukan admin
        return NextResponse.redirect(new URL("/",request.url))
    }
    if(isLoggedIn &&pathname.startsWith("/signin")){ // jika user telah login dan berusaha mengakses halaman login lagi, maka dia akan diarahkan kembali ke halaman login
        return NextResponse.redirect(new URL("/",request.url))
    }
}

export const config = {
    matcher:["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}