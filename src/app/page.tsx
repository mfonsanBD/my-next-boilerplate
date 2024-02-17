import AuthBase from '@/components/AuthBase/AuthBase'
import LoginForm from '@/components/LoginForm/LoginForm'

export default function Home() {
  return (
    <AuthBase>
      <LoginForm />
    </AuthBase>
  )
}
