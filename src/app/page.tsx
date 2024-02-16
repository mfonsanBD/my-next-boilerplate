import AuthBase from '@/components/AuthBase'
import LoginForm from '@/components/LoginForm'

export default function Home() {
  return (
    <AuthBase>
      <LoginForm />
    </AuthBase>
  )
}
