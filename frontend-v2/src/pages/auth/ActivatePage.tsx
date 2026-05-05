import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { CheckCircle2, ShieldX } from 'lucide-react'
import { AuthShell } from '@/components/layout/AuthShell'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { activateAccount } from '@/api/auth'
import { getApiErrorMessage } from '@/lib/utils'

/**
 * Link-based activation. The email a new user receives has a URL like
 * /activate?u=<publicId>&t=<rawToken>. The user lands here, picks a
 * password, and submits — the account flips to ACTIVE and they can log in.
 */
export function ActivatePage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const userPublicId = params.get('u') || ''
  const token = params.get('t') || ''
  const linkValid = !!userPublicId && !!token

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  // Bail early if the URL is malformed
  useEffect(() => {
    if (!linkValid) {
      // No toast — the page itself shows a clear message.
    }
  }, [linkValid])

  const submit = async (e: React.FormEvent) => {
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
      await activateAccount({ userPublicId, token, newPassword })
      setDone(true)
      toast.success('تم تفعيل الحساب — يمكنك تسجيل الدخول الآن')
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'الرابط غير صالح أو منتهي الصلاحية'))
    } finally {
      setLoading(false)
    }
  }

  if (!linkValid) {
    return (
      <AuthShell>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldX className="h-5 w-5" />
              <CardTitle>رابط غير صالح</CardTitle>
            </div>
            <CardDescription>
              الرابط الذي وصلتك ناقص أو غير سليم. تأكد من فتح الرابط كاملاً
              من بريدك الإلكتروني، أو اطلب من مكتبك إعادة إرسال دعوة التفعيل.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => navigate('/login')}>
              العودة لتسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      </AuthShell>
    )
  }

  if (done) {
    return (
      <AuthShell>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
              <CardTitle>تم التفعيل بنجاح</CardTitle>
            </div>
            <CardDescription>
              يمكنك الآن تسجيل الدخول باستخدام بريدك أو اسم المستخدم وكلمة المرور التي اخترتها.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => navigate('/login')}>
              تسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      </AuthShell>
    )
  }

  return (
    <AuthShell>
      <Card>
        <CardHeader>
          <CardTitle>تفعيل الحساب</CardTitle>
          <CardDescription>
            اختر كلمة مرور قوية لتفعيل حسابك (8 أحرف على الأقل).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="newPassword">كلمة المرور</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoFocus
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
            <div className="text-center text-sm pt-2">
              <Link to="/login" className="text-muted hover:text-accent">
                لديك حساب مفعّل؟ تسجيل الدخول
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthShell>
  )
}
