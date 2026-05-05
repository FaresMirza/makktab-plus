# Employee Activation Components

هذا المجلد يحتوي على مكونات صفحة تفعيل حسابات الموظفين، تم تقسيمها إلى مكونات منفصلة لتحسين قابلية الصيانة وإعادة الاستخدام.

## السيناريو

عندما يقوم صاحب المكتب أو المدير بإضافة موظف جديد:
1. يتم إرسال رابط تفعيل للموظف عبر البريد الإلكتروني أو الرسائل
2. الرابط يحتوي على token فريد للتفعيل
3. عند فتح الرابط، يمر الموظف بخطوات التفعيل التالية:
   - **الخطوة 1:** التحقق من رقم الجوال (يجب أن يطابق الرقم المسجل)
   - **الخطوة 2:** إدخال رمز OTP المرسل
   - **الخطوة 3:** إنشاء كلمة مرور جديدة
   - **الخطوة 4:** رسالة نجاح التفعيل

## المكونات

### 1. **PhoneVerificationForm.jsx**
مكون التحقق من رقم الجوال - الخطوة الأولى.

**Props:**
- `onSubmit` (function): دالة تُستدعى عند إرسال رقم الجوال (تستقبل رقم الجوال)
- `showToast` (function): دالة عرض الرسائل
- `loading` (boolean): حالة التحميل

**الوظيفة:**
- يطلب من الموظف إدخال رقم جواله
- يتحقق من صحة الرقم (رقم سعودي)
- يرسل الرقم للتحقق من مطابقته للرقم المسجل في النظام

### 2. **ActivateOtpStep.jsx**
مكون التحقق من OTP - الخطوة الثانية.

**Props:**
- `phone` (string): رقم الجوال (لعرضه مُخفي جزئياً)
- `onVerify` (function): دالة التحقق من OTP
- `onBack` (function): دالة الرجوع للخطوة السابقة
- `onResend` (function): دالة إعادة إرسال OTP
- `showToast` (function): دالة عرض الرسائل
- `loading` (boolean): حالة التحميل
- `maxAttempts` (number): العدد الأقصى للمحاولات
- `attemptsLeft` (number): المحاولات المتبقية

**الوظيفة:**
- يطلب إدخال رمز OTP المكون من 4 أرقام
- يعرض عداد للوقت المتبقي لإعادة الإرسال
- يتتبع عدد المحاولات الفاشلة
- يتيح إعادة إرسال الرمز بعد انتهاء المؤقت

### 3. **ActivatePasswordForm.jsx**
مكون إنشاء كلمة المرور - الخطوة الثالثة.

**Props:**
- `onSubmit` (function): دالة إرسال النموذج (تستقبل كلمة المرور)
- `onBack` (function): دالة الرجوع للخطوة السابقة
- `showToast` (function): دالة عرض الرسائل
- `loading` (boolean): حالة التحميل

**الوظيفة:**
- يطلب إنشاء كلمة مرور جديدة
- يعرض مؤشر قوة كلمة المرور
- يطلب تأكيد كلمة المرور
- يتحقق من صحة كلمة المرور (8 أحرف على الأقل)
- يتحقق من تطابق كلمة المرور مع التأكيد

### 4. **ActivateSuccessMessage.jsx**
مكون رسالة النجاح - الخطوة النهائية.

**Props:**
- `onGoToLogin` (function): دالة الانتقال لصفحة تسجيل الدخول

**الوظيفة:**
- يعرض رسالة نجاح التفعيل
- يوفر زر للانتقال لصفحة تسجيل الدخول

## صفحة التفعيل الرئيسية

### **ActivatePage.jsx**

الصفحة الرئيسية التي تدير عملية التفعيل متعددة الخطوات.

**الوظائف الرئيسية:**

#### 1. إدارة الخطوات
```javascript
const [step, setStep] = useState('phone') // 'phone', 'otp', 'password', 'success'
```

#### 2. التحقق من رقم الجوال
```javascript
const handlePhoneSubmit = async (phone) => {
  // في الإنتاج: التحقق من مطابقة الرقم للرقم المسجل
  // await api.verifyEmployeePhone({ token: activationToken, phone })
}
```

#### 3. التحقق من OTP
```javascript
const handleOtpVerify = async (otp) => {
  // في الإنتاج: التحقق من OTP مع الـ Backend
  // await api.verifyOtp({ token: activationToken, phone, otp })
}
```

#### 4. تفعيل الحساب
```javascript
const handlePasswordSubmit = async () => {
  // في الإنتاج: تفعيل حساب الموظف
  // await api.activateEmployeeAccount({
  //   token: activationToken,
  //   phone: phoneNumber
  // })
}
```

## التكامل مع الـ Backend

### API Endpoints المطلوبة:

1. **POST /api/activate/verify-phone**
   ```json
   {
     "token": "activation_token",
     "phone": "05xxxxxxxx"
   }
   ```
   - يتحقق من مطابقة رقم الجوال للرقم المسجل
   - يرسل OTP للجوال

2. **POST /api/activate/verify-otp**
   ```json
   {
     "token": "activation_token",
     "phone": "05xxxxxxxx",
     "otp": "1234"
   }
   ```
   - يتحقق من صحة OTP

3. **POST /api/activate/complete**
   ```json
   {
     "token": "activation_token",
     "phone": "05xxxxxxxx",
     "password": "securePassword123"
   }
   ```
   - يفعل الحساب
   - يحفظ كلمة المرور
   - يغير حالة الموظف من PENDING_ACTIVATION إلى ACTIVE

4. **POST /api/activate/resend-otp**
   ```json
   {
     "token": "activation_token",
     "phone": "05xxxxxxxx"
   }
   ```
   - يعيد إرسال OTP

## الاستخدام

```jsx
import ActivatePage from './pages/auth/ActivatePage'

// في التطبيق
<Route path="/auth/activate" element={<ActivatePage />} />
```

**مثال على الرابط:**
```
https://your-app.com/auth/activate?token=abcd1234xyz
```

## الأمان

### اعتبارات أمنية مهمة:

1. **التحقق من Token:**
   - يجب التحقق من صلاحية token مع كل request
   - Token يجب أن ينتهي بعد فترة زمنية محددة
   - Token يجب أن يُستخدم مرة واحدة فقط

2. **التحقق من رقم الجوال:**
   - رقم الجوال المُدخل يجب أن يطابق بالضبط الرقم المسجل
   - لا يجب الكشف عن معلومات إضافية في حالة عدم المطابقة

3. **OTP:**
   - OTP صالح لمدة محدودة (90 ثانية في المثال)
   - عدد محاولات محدود (3 محاولات)
   - عدد محدود لإعادة الإرسال

4. **كلمة المرور:**
   - يجب تطبيق سياسات قوة كلمة المرور
   - تُحفظ مُشفرة في قاعدة البيانات (bcrypt/argon2)

## المتغيرات القابلة للتخصيص

```javascript
const MAX_ATTEMPTS = 3          // عدد محاولات OTP
const OTP_TIMER = 90            // مدة المؤقت بالثواني
const OTP_LENGTH = 4            // طول رمز OTP
const MIN_PASSWORD_LENGTH = 8   // الحد الأدنى لطول كلمة المرور
```

## التحسينات المستقبلية

- [ ] إضافة progress indicator يوضح الخطوة الحالية
- [ ] دعم إرسال OTP عبر البريد الإلكتروني كبديل
- [ ] إضافة captcha للحماية من الـ bots
- [ ] تحسين رسائل الخطأ لتكون أكثر وضوحاً
- [ ] إضافة خيار "تذكرني" بعد التفعيل
- [ ] دعم المصادقة الثنائية (2FA)

## الملفات ذات الصلة

- `src/utils/validation.js` - دوال التحقق من الصحة
- `src/hooks/useOtpTimer.js` - Custom hook للمؤقت
- `src/components/office-register/` - مكونات مشتركة (FormStepHeader, PasswordStrengthMeter)

## ملاحظات

- جميع النصوص باللغة العربية
- تصميم متجاوب يدعم جميع أحجام الشاشات
- يستخدم PrimeReact للمكونات الأساسية
- inline styles حالياً، يمكن نقلها لـ CSS modules
