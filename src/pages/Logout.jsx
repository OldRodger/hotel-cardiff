import { redirect } from "react-router-dom";

export function logoutAction() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('expiration');

    return redirect("/");
}