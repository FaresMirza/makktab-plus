import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthShell } from '@/components/layout/AuthShell'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { resendFirstLoginOtp, verifyFirstLogin } from '@/api/auth'
import { getApiErrorMessage } from '@/lib/utils'

/**
 * First-login activation: a new employee/admin user receives an email
 * with a username; they enter it here, request an OTP, and set their
 * initial password to activate the account.
 */
export function ActivatePage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [step, setStep] = useState<'username' | 'finish'>(params.get('username') ? 'finish' : 'username')
  const [username, setUsername] = useState(params.get('username') || '')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const sendOtp = async () => {
    if (!username) {
      toast.error('أدخل اسم المستخدم أو البريد')
      return
    }
    setLoading(true)
    try {
      const res = await resendFirstLoginOtp(username)
      toast.success('تم إرسال رمز التفعيل إلى بريدك')
      if (res.otp) toast.message(`الرمز (تطوير): ${res.otp}`)
      setStep('finish')
    } catch (err) {
      toast.error(getApiErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const submitFinish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 8) {
      toast.error('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('كلمتا المرور غير متطابقتين')
      return
    }
    setLoading(true)
    try {
      await verifyFirstLogin({ username, otp, newPassword, confirmPassword })
      toast.success('تم تفعيل حسابك — قم بتسجيل الدخول')
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
          <CardTitle>تفعيل الحساب</CardTitle>
          <CardDescription>
            {step === 'username'
              ? 'أدخل اسم المستخدم لإرسال رمز التفعيل'
              : 'أدخل الرمز واختر كلمة المرور'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'username' ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">اسم المستخدم أو البريد</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </div>
              <Button onClick={sendOtp} loading={loading} className="w-full">
                إرسال رمز التفعيل
              </Button>
              <div className="text-center text-sm pt-2">
                <Link to="/login" className="text-muted hover:text-accent">
                  العودة لتسجيل الدخول
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submitFinish} className="space-y-4">
              <div>
                <Label htmlFor="otp">رمز التفعيل</Label>
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
                <Label htmlFor="newPassword">كلمة المرور</Label>
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
                تفعيل الحساب
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </AuthShell>
  )
}
