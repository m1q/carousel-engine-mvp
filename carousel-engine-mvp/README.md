# Carousel Engine MVP v2

نسخة بدون API. الفكرة أن تستخدم ChatGPT يدويًا لتوليد JSON، ثم تستورده داخل الأداة.

## التشغيل

افتح `index.html` مباشرة في المتصفح.

## الجديد في v2

- تبويب Prompts لتوليد prompt جاهز لـ ChatGPT
- استيراد مرن لثلاث صيغ:
  - مشروع كامل
  - `{ "slides": [...] }`
  - `{ "blocks": [...] }`
- تحديد الشريحة والبلوك من الـ preview نفسه
- مشروع فارغ جديد
- Toasts بدل alerts في أغلب الإجراءات
- حفظ محلي تلقائي

## الأنواع المدعومة

- hero
- text
- checklist
- stat
- image-text
- cta

## الملاحظات

- لا يوجد export PNG حاليًا
- لا يوجد drag and drop حاليًا
- لا يوجد API أو AI مدمج: فقط workflow يدوي مع ChatGPT
