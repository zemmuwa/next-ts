import { TextField, Button } from "@mui/material"
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { data, status } = useSession()
    const login = async () => {
        await signIn('credentials', { password, username: email })
    }
    return (
        <div>
            <TextField
                id="email"
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={() => login()} variant="contained">Contained</Button>
        </div>
    )
}