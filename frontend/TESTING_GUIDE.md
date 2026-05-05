# 🧪 Testing Guide - Project Workflow Features

## Quick Start Testing

### Step 1: Login as Office Owner
```
Username: owner1
Password: owner123
```

### Step 2: Test Project Creation
1. Navigate to "المشاريع" from sidebar
2. Click "مشروع جديد" button
3. Fill in the form:
   - اسم المشروع: "Test Villa Project"
   - اسم العميل: "محمد السعيد"
   - الميزانية: 5000000
   - تاريخ البدء: Select today
   - تاريخ الانتهاء: Select future date
   - **مدير المشروع:** Select "أحمد محمد (مالك المكتب)" ← THIS IS NEW!
4. Click "حفظ"
5. ✅ Project should appear in cards

### Step 3: Test "God Mode" Delete
1. Look at project cards
2. You should see delete button (trash icon) on **ALL projects**
3. Click delete on any project
4. ✅ Project removed with success toast

### Step 4: Test Task Creation with Files
1. Click "عرض التفاصيل" on any project
2. Click "إضافة مهمة" button (visible because you're owner)
3. Fill in:
   - اسم المهمة: "تصميم المخططات"
   - تعيين إلى: Select any employee
   - تاريخ التسليم: Select date
   - الأولوية: Select priority
   - **المرفقات:** Click "اختر الملفات" and select images/PDFs ← NEW!
4. Click "حفظ"
5. ✅ Task created with file list shown

### Step 5: Test Manager Permissions
1. Navigate to Project #2 (managed by employee1, not you)
2. ✅ You should still see "إضافة مهمة" button (God Mode!)
3. ✅ You should see edit/delete buttons on tasks (God Mode!)
4. This proves Owner can manage ANY project

### Step 6: Test Employee Task Completion
1. Logout (top-right menu → تسجيل الخروج)
2. Login as employee:
   ```
   Username: employee1
   Password: emp123
   ```
3. Navigate to "المشاريع"
4. Open any project
5. Find a task assigned to "فاطمة علي" (employee1's name)
6. Click the green checkmark button (✓) next to the task
7. **Proof of Work Dialog** opens ← NEW!
8. Try clicking "تسليم المهمة" without filling
9. ✅ Warning: "يرجى إضافة ملاحظات الإنجاز"
10. Fill in notes: "تم إنجاز العمل بنجاح وتسليمه للعميل"
11. Try submitting again
12. ✅ Warning: "يرجى إرفاق ملف واحد على الأقل"
13. Upload a file (image or PDF)
14. Click "تسليم المهمة"
15. ✅ Task marked as Completed with green tag

### Step 7: Test Permission Restrictions
While logged in as employee1:
1. Navigate to Project #1 (managed by owner, not employee)
2. ❌ "إضافة مهمة" button should be HIDDEN
3. ❌ Edit/Delete buttons on tasks should be HIDDEN
4. ✅ Only "Complete" button visible on YOUR assigned tasks
5. This proves employees can't manage projects they're not assigned to

---

## Feature Checklist

### ✅ Feature 1: Office Owner in Manager Dropdown
- [ ] Project creation dialog opens
- [ ] Manager dropdown shows "أحمد محمد (مالك المكتب)"
- [ ] Can select owner as manager
- [ ] Project saves with managerId = 2 (owner)

### ✅ Feature 2: File Upload in Task Creation
- [ ] Task dialog shows file upload component
- [ ] Can select multiple files
- [ ] File names appear below upload button
- [ ] Files saved in task.attachments array

### ✅ Feature 3: Proof of Work Dialog
- [ ] Complete button appears only for assigned employee
- [ ] Dialog requires completion notes
- [ ] Dialog requires at least 1 file attachment
- [ ] Validation warnings show for missing fields
- [ ] Task marked completed after submission

### ✅ Feature 4: Owner God Mode
- [ ] Owner sees delete button on ALL projects
- [ ] Owner sees "إضافة مهمة" on ALL projects
- [ ] Owner can edit/delete ANY task
- [ ] Manager sees buttons only on assigned projects
- [ ] Employee cannot manage any projects

### ✅ Feature 5: Button Visibility Logic
- [ ] Delete button on project cards follows permissions
- [ ] Task actions column shows correct buttons per role
- [ ] Complete button only for assigned tasks
- [ ] Edit/delete only for managers/owner

---

## Expected Behaviors

### As Office Owner (owner1):
- ✅ See all projects
- ✅ Create new projects
- ✅ Delete ANY project
- ✅ Add tasks to ANY project
- ✅ Edit/delete ANY task
- ✅ Complete tasks assigned to you

### As Manager (if managerId matches user):
- ✅ See all projects
- ✅ Create new projects
- ✅ Delete only assigned projects
- ✅ Add tasks only to assigned projects
- ✅ Edit/delete only tasks in assigned projects
- ✅ Complete tasks assigned to you

### As Employee (employee1):
- ✅ See all projects (view only)
- ❌ Cannot create projects
- ❌ Cannot delete any projects
- ❌ Cannot add tasks
- ❌ Cannot edit/delete tasks
- ✅ Complete tasks assigned to you with proof

---

## Common Issues & Solutions

### Issue: "إضافة مهمة" button not showing
**Solution:** Check if:
1. User is Office Owner → Should always show
2. User is Manager → Only shows on assigned projects (check managerId)
3. User is Employee → Never shows (expected)

### Issue: Delete button not showing on project
**Solution:** Check if:
1. User is Office Owner → Should show on ALL
2. User is Manager → Only on projects where managerId === currentUser.id
3. User is Employee → Never shows (expected)

### Issue: Cannot submit proof of work
**Solution:** Ensure both:
1. Completion notes textarea is filled with text
2. At least 1 file is uploaded
3. Both are required fields

### Issue: Complete button not visible
**Solution:** Check if:
1. Task.assignedTo matches currentUser.name
2. Task.status is not already "Completed"
3. Both conditions must be true

---

## Test Data Reference

### Mock Users:
```javascript
// Office Owner
username: 'owner1'
password: 'owner123'
id: 2
name: 'أحمد محمد'
role: 'office_owner'

// Employee
username: 'employee1'
password: 'emp123'
id: 3
name: 'فاطمة علي'
role: 'employee'
```

### Mock Projects:
- Project #1: Managed by owner (id: 2)
- Project #2: Managed by employee (id: 3)
- Project #3: Managed by owner (id: 2)
- Project #4: Managed by employee (id: 3)

---

## Success Criteria

✅ All features implemented
✅ No compilation errors
✅ Proper permission logic
✅ Data validation works
✅ User-friendly error messages
✅ Clean UI with tooltips
✅ RTL Arabic interface maintained
✅ Toast notifications working

---

## Next: Run Development Server

```bash
npm run dev
```

Then open browser and start testing! 🚀
