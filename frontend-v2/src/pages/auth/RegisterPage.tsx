import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthShell } from '@/components/layout/AuthShell'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { register, verifyRegistration } from '@/api/auth'
import { getApiErrorMessage } from '@/lib/utils'

interface FormState {
  officeName: string
  ownerFullName: string
  username: string
  email: string
  phone: string
  city: string
  password: string
}

const initial: FormState = {
  officeName: '',
  ownerFullName: '',
  username: '',
  email: '',
  phone: '',
  city: '',
  password: '',
}

export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>(initial)
  const [step, setStep] = useState<'form' | 'otp' | 'done'>('form')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((s) => ({ ...s, [k]: v }))

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    for (const k of Object.keys(form) as (keyof FormState)[]) {
      if (!form[k]) {
        toast.error('جميع الحقول مطلوبة')
        return
      }
    }
    if (form.password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }
    setLoading(true)
    try {
      await register(form)
      toast.success('تم إرسال رمز التحقق إلى بريدك')
      setStep('otp')
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'فشل التسجيل'))
    } finally {
      setLoading(false)
    }
  }

  const submitOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 4) {
      toast.error('أدخل رمز التحقق')
      return
    }
    setLoading(true)
    try {
      await verifyRegistration({ email: form.email, otp })
      setStep('done')
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'رمز التحقق غير صحيح'))
    } finally {
      setLoading(false)
    }
  }

  if (step === 'done') {
    return (
      <AuthShell>
        <Card>
          <CardHeader>
            <CardTitle>تم استلام طلبك</CardTitle>
            <CardDescription>
              سيتم مراجعة طلب تسجيل المكتب من قبل الإدارة. ستتلقى بريداً عند الموافقة.
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

  return (
    <AuthShell>
      <Card>
        <CardHeader>
          <CardTitle>تسجيل مكتب جديد</CardTitle>
          <CardDescription>
            {step === 'form' ? 'املأ بيانات المكتب والمالك' : 'تأكيد البريد الإلكتروني'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'form' ? (
            <form onSubmit={submitForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="officeName">اسم المكتب</Label>
                  <Input id="officeName" value={form.officeName} onChange={(e) => set('officeName', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="ownerFullName">اسم المالك</Label>
                  <Input id="ownerFullName" value={form.ownerFullName} onChange={(e) => set('ownerFullName', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="username">اسم المستخدم</Label>
                  <Input id="username" value={form.username} onChange={(e) => set('username', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="phone">الجوال</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="city">المدينة</Label>
                  <Input id="city" value={form.city} onChange={(e) => set('city', e.target.value)} />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Input id="password" type="password" value={form.password} onChange={(e) => set('password', e.target.value)} />
                </div>
              </div>
              <Button type="submit" loading={loading} className="w-full">
                إرسال طلب التسجيل
              </Button>
              <div className="text-center text-sm pt-2">
                <Link to="/login" className="text-muted hover:text-accent">
                  لديك حساب؟ تسجيل الدخول
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={submitOtp} className="space-y-4">
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
                تأكيد البريد
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </AuthShell>
  )
}
