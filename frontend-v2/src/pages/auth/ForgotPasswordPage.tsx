import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthShell } from '@/components/layout/AuthShell'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { forgotPassword, verifyForgotPassword } from '@/api/auth'
import { getApiErrorMessage } from '@/lib/utils'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'username' | 'reset'>('username')
  const [username, setUsername] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username) {
      toast.error('أدخل اسم المستخدم أو البريد')
      return
    }
    setLoading(true)
    try {
      await forgotPassword(username)
      toast.success('تم إرسال رمز التحقق')
      setStep('reset')
    } catch (err) {
      toast.error(getApiErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const onReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 8) {
      toast.error('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('كلمتا المرور غير متطابقتين')
      return
    }
    if (otp.length < 4) {
      toast.error('أدخل رمز التحقق')
      return
    }
    setLoading(true)
    try {
      await verifyForgotPassword({ username, otp, newPassword, confirmPassword })
      toast.success('تم تغيير كلمة المرور — يمكنك تسجيل الدخول')
      navigate('/login')
    } catch (err) {
      toast.error(getApiErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell>
      <Card>
        <CardHeader>
          <CardTitle>استعادة كلمة المرور</CardTitle>
          <CardDescription>
            {step === 'username' ? 'أدخل اسم المستخدم أو البريد' : 'أدخل الرمز وكلمة المرور الجديدة'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'username' ? (
            <form onSubmit={onSendOtp} className="space-y-4">
              <div>
                <Label htmlFor="username">اسم المستخدم أو البريد</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </div>
              <Button type="submit" loading={loading} className="w-full">
                إرسال رمز التحقق
              </Button>
              <div className="text-center text-sm pt-2">
                <Link to="/login" className="text-muted hover:text-accent">
                  العودة لتسجيل الدخول
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={onReset} className="space-y-4">
              <div>
                <Label htmlFor="otp">رمز التحقق</Label>
                <Input
                  id="otp"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="text-center tracking-[0.5em] text-lg"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" loading={loading} className="w-full">
                حفظ كلمة المرور
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </AuthShell>
  )
}
