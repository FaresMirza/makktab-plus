import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthShell } from '@/components/layout/AuthShell'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { useAuth } from '@/auth/AuthContext'
import { getApiErrorMessage } from '@/lib/utils'

export function LoginPage() {
  const { beginLogin, completeLogin, loading } = useAuth()
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')

  const onSubmitCredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      toast.error('يرجى إدخال اسم المستخدم وكلمة المرور')
      return
    }
    try {
      const res = await beginLogin(username, password)
      toast.success('تم إرسال رمز التحقق إلى بريدك الإلكتروني')
      if (res.otp) {
        // dev convenience — backend currently returns OTP in the response
        toast.message(`رمز التحقق (تطوير): ${res.otp}`)
      }
      setStep('otp')
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'فشل تسجيل الدخول'))
    }
  }

  const onSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 4) {
      toast.error('أدخل رمز التحقق المكوّن من 6 أرقام')
      return
    }
    try {
      await completeLogin(otp)
      toast.success('تم تسجيل الدخول بنجاح')
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'رمز التحقق غير صحيح'))
    }
  }

  return (
    <AuthShell>
      <Card>
        <CardHeader>
          <CardTitle>تسجيل الدخول</CardTitle>
          <CardDescription>
            {step === 'credentials' ? 'أدخل بياناتك للمتابعة' : 'أدخل رمز التحقق المرسل إلى بريدك'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'credentials' ? (
            <form onSubmit={onSubmitCredentials} className="space-y-4">
              <div>
                <Label htmlFor="username">اسم المستخدم أو البريد</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                />
              </div>
              <div>
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" loading={loading} className="w-full">
                متابعة
              </Button>
              <div className="flex justify-between text-sm pt-2">
                <Link to="/forgot-password" className="text-muted hover:text-accent">
                  نسيت كلمة المرور؟
                </Link>
                <Link to="/register" className="text-muted hover:text-accent">
                  تسجيل مكتب جديد
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={onSubmitOtp} className="space-y-4">
              <div>
                <Label htmlFor="otp">رمز التحقق</Label>
                <Input
                  id="otp"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                  className="text-center tracking-[0.5em] text-lg"
                />
              </div>
              <Button type="submit" loading={loading} className="w-full">
                تأكيد الدخول
              </Button>
              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="w-full text-sm text-muted hover:text-accent pt-2"
              >
                العودة لتغيير البيانات
              </button>
            </form>
          )}
        </CardContent>
      </Card>
    </AuthShell>
  )
}
