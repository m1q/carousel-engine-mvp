const STORAGE_KEY = 'carousel-blocks-engine-project-v3';

const BRAND_PRESETS = {
  framex: {
    label: 'FrameX Default',
    accent: '#ff6b4a',
    defaultMode: 'light',
    brandLabel: 'رؤية FrameX',
    handle: '@framex'
  },
  tech: {
    label: 'Tech',
    accent: '#2f80ed',
    defaultMode: 'dark',
    brandLabel: 'Tech Vision',
    handle: '@techbrand'
  },
  premium: {
    label: 'Premium',
    accent: '#c9a227',
    defaultMode: 'dark',
    brandLabel: 'Premium Studio',
    handle: '@premiumbrand'
  },
  educational: {
    label: 'Educational',
    accent: '#27ae60',
    defaultMode: 'light',
    brandLabel: 'شرح واضح',
    handle: '@edubrand'
  },
  bold: {
    label: 'Bold Arabic',
    accent: '#ef4444',
    defaultMode: 'dark',
    brandLabel: 'رسالة مباشرة',
    handle: '@boldbrand'
  }
};

const FLOW_TEMPLATES = {
  hook_problem_solution_cta: {
    title: 'Hook → Problem → Solution → CTA',
    tag: 'أفضل مسار عام',
    description: 'الأنسب للمحتوى البيعي أو التوعوي السريع. يبدأ بخطاف ثم المشكلة ثم الحل ثم إغلاق واضح.',
    create: (ctx) => [
      {
        role: 'cover', layoutFamily: 'dark', background: { mode: 'dark' }, blocks: [
          { type: 'hero', content: { eyebrow: 'ليش هذا الموضوع مهم؟', title: shortText(ctx.topic || 'عنوان رئيسي قوي', 38), highlightedText: shortText(ctx.goal || 'النتيجة التي تريدها', 30), subtitle: `للـ ${ctx.audience || 'الجمهور المناسب'} — سنبني لك flow واضح بدل شرائح عشوائية.` } }
        ]
      },
      {
        role: 'problem', layoutFamily: 'card', background: { mode: 'light' }, blocks: [
          { type: 'text', content: { title: 'وين المشكلة؟', paragraph: `المشكلة ليست فقط في الوصول، بل في طريقة عرض ${ctx.topic || 'الفكرة'}، وترتيب الرسالة، وتوقيت الـ CTA.` } },
          { type: 'checklist', content: { title: 'ثلاث نقاط تؤذي الأداء', items: [
            { text: 'بداية ضعيفة لا تشد الانتباه' },
            { text: 'عرض غير واضح أو بلا فائدة مباشرة' },
            { text: 'إنهاء بدون إجراء واضح' }
          ] } }
        ]
      },
      {
        role: 'solution', layoutFamily: 'premium', background: { mode: 'dark' }, blocks: [
          { type: 'stat', content: { title: 'الحل العملي', value: '4', label: 'شرائح مركزة تكفي غالبًا', supportingText: 'خطاف + مشكلة + حل + CTA أقوى من 9 شرائح مكررة.' } },
          { type: 'text', content: { title: 'ماذا نفعل هنا؟', paragraph: `نحوّل ${ctx.topic || 'الفكرة'} إلى وحدات واضحة: رسالة، دليل، ثم خطوة نهائية بسيطة.` } }
        ]
      },
      {
        role: 'cta', layoutFamily: 'centered', background: { mode: 'light' }, blocks: [
          { type: 'cta', content: { title: 'الخطوة القادمة', message: ctx.offer || 'جهّز الفكرة، وابنِ carousel أنظف وأسرع.', buttonText: 'ابدأ الآن', subtext: `النبرة المختارة: ${ctx.tone}` } }
        ]
      }
    ]
  },
  mistakes_fixes_cta: {
    title: 'Mistakes → Fixes → CTA',
    tag: 'للشرح والتعليم',
    description: 'ممتاز عندما تريد تعليم الجمهور عبر أخطاء شائعة ثم تصحيحها.',
    create: (ctx) => [
      {
        role: 'cover', layoutFamily: 'dark', background: { mode: 'image', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop' }, blocks: [
          { type: 'hero', content: { eyebrow: 'أكثر الأخطاء تكرارًا', title: `أخطاء في ${shortText(ctx.topic || 'موضوعك', 26)}`, highlightedText: 'تمنع النتيجة', subtitle: `محتوى مناسب لـ ${ctx.audience || 'الناس المهتمين'} مع تصحيحات واضحة.` } }
        ]
      },
      {
        role: 'problem', layoutFamily: 'card', background: { mode: 'light' }, blocks: [
          { type: 'checklist', content: { title: 'الأخطاء', items: [
            { text: 'خطاف أول ضعيف' },
            { text: 'شرح طويل في شريحة واحدة' },
            { text: 'إنهاء بلا CTA مباشر' }
          ] } }
        ]
      },
      {
        role: 'solution', layoutFamily: 'stack', background: { mode: 'light' }, blocks: [
          { type: 'text', content: { title: 'كيف نصلحها؟', paragraph: `اجعل الرسالة حول ${ctx.topic || 'الفكرة'} أقصر، وأضف قيمة سريعة، وانقل القارئ خطوة بخطوة.` } },
          { type: 'checklist', content: { title: 'التصحيحات', items: [
            { text: 'شريحة أولى أقوى' },
            { text: 'تقسيم الشرح إلى وحدات' },
            { text: 'CTA واضح ومحدد' }
          ] } }
        ]
      },
      {
        role: 'proof', layoutFamily: 'premium', background: { mode: 'dark' }, blocks: [
          { type: 'stat', content: { title: 'النتيجة المتوقعة', value: '↑', label: 'وضوح أعلى واحتكاك أقل', supportingText: 'حتى لو بقي نفس الموضوع، فالهيكل الأفضل يرفع الجودة.' } }
        ]
      },
      {
        role: 'cta', layoutFamily: 'centered', background: { mode: 'light' }, blocks: [
          { type: 'cta', content: { title: 'حوّلها إلى نسخة أفضل', message: ctx.offer || 'ابدأ بنسخة جديدة، أو اطلب من ChatGPT JSON مرتب.', buttonText: 'ابنِ نسخة محسنة', subtext: ctx.goal || 'هدف المنشور' } }
        ]
      }
    ]
  },
  before_after_offer: {
    title: 'Before → After → Offer',
    tag: 'للخدمات والتحويل',
    description: 'مناسب عندما تريد عرض الفرق قبل وبعد استخدام خدمتك أو طريقتك.',
    create: (ctx) => [
      {
        role: 'cover', layoutFamily: 'premium', background: { mode: 'dark' }, blocks: [
          { type: 'hero', content: { eyebrow: 'قبل / بعد', title: shortText(ctx.topic || 'الفكرة الحالية', 34), highlightedText: 'لكن بشكل أوضح', subtitle: `اعرض التحول الذي يريده ${ctx.audience || 'الجمهور'}.` } }
        ]
      },
      {
        role: 'problem', layoutFamily: 'card', background: { mode: 'light' }, blocks: [
          { type: 'text', content: { title: 'قبل', paragraph: `الوضع الحالي: رسائل متفرقة، عناوين ضعيفة، أو عرض ${ctx.topic || 'الفكرة'} بطريقة مربكة.` } }
        ]
      },
      {
        role: 'solution', layoutFamily: 'card', background: { mode: 'light' }, blocks: [
          { type: 'text', content: { title: 'بعد', paragraph: `هيكل أنظف، قيمة أوضح، وتسلسل يوصّل الرسالة إلى ${ctx.audience || 'الشخص المناسب'} بطريقة أقوى.` } },
          { type: 'image-text', content: { imageUrl: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop', title: 'شكل أفضل', paragraph: 'نفس الفكرة، لكن بإخراج أقوى وتنظيم أوضح.', caption: 'استفد من البلوكات بدل بناء كل شريحة من الصفر.' } }
        ]
      },
      {
        role: 'proof', layoutFamily: 'dark', background: { mode: 'dark' }, blocks: [
          { type: 'stat', content: { title: 'الفارق', value: '2x', label: 'وضوح وتسلسل أقوى', supportingText: 'ليس رقمًا علميًا، بل تذكير أن البنية الجيدة تغيّر الإحساس بالكامل.' } }
        ]
      },
      {
        role: 'cta', layoutFamily: 'centered', background: { mode: 'light' }, blocks: [
          { type: 'cta', content: { title: 'خذ النسخة الأفضل', message: ctx.offer || 'ابدأ بـ flow جاهز ثم عدّل التفاصيل بدل البداية من صفحة فارغة.', buttonText: 'طبّق هذا المسار', subtext: ctx.goal || 'الهدف' } }
        ]
      }
    ]
  },
  educational_steps: {
    title: 'Educational Steps',
    tag: 'للشرح خطوة بخطوة',
    description: 'أفضل مسار للمحتوى التعليمي: تعريف سريع ثم خطوات ثم ملخص.',
    create: (ctx) => [
      {
        role: 'cover', layoutFamily: 'dark', background: { mode: 'dark' }, blocks: [
          { type: 'hero', content: { eyebrow: 'شرح عملي', title: shortText(ctx.topic || 'الموضوع', 34), highlightedText: 'بخطوات واضحة', subtitle: `موجّه إلى ${ctx.audience || 'المتعلمين'} مع تقسيم بسيط.` } }
        ]
      },
      {
        role: 'intro', layoutFamily: 'card', background: { mode: 'light' }, blocks: [
          { type: 'text', content: { title: 'الفكرة الأساسية', paragraph: `قبل التفاصيل، يجب أن يفهم القارئ لماذا ${ctx.topic || 'هذا الموضوع'} مهم وما النتيجة التي سيأخذها.` } }
        ]
      },
      {
        role: 'solution', layoutFamily: 'stack', background: { mode: 'light' }, blocks: [
          { type: 'checklist', content: { title: 'الخطوات', items: [
            { text: 'ابدأ من الفكرة الرئيسية' },
            { text: 'قسّم المحتوى إلى بلوكات قصيرة' },
            { text: 'اختم بخلاصة أو CTA' }
          ] } }
        ]
      },
      {
        role: 'summary', layoutFamily: 'card', background: { mode: 'light' }, blocks: [
          { type: 'stat', content: { title: 'الخلاصة', value: '3', label: 'خطوات تكفي غالبًا', supportingText: 'وضوح الفكرة أهم من كثرة الشرائح.' } }
        ]
      },
      {
        role: 'cta', layoutFamily: 'centered', background: { mode: 'light' }, blocks: [
          { type: 'cta', content: { title: 'طبقها الآن', message: ctx.offer || 'ابنِ نسختك التعليمية بسرعة ثم حسّنها يدويًا.', buttonText: 'ابدأ بالتطبيق', subtext: ctx.goal || 'الهدف' } }
        ]
      }
    ]
  },
  objections_close: {
    title: 'Objections → Answers → Close',
    tag: 'للبيع والخدمات',
    description: 'لما يكون جمهورك مترددًا وتحتاج ترد على اعتراضات شائعة قبل الإغلاق.',
    create: (ctx) => [
      {
        role: 'cover', layoutFamily: 'dark', background: { mode: 'dark' }, blocks: [
          { type: 'hero', content: { eyebrow: 'اعتراضات شائعة', title: shortText(ctx.topic || 'هل هذا مناسب؟', 34), highlightedText: 'خل نجاوب بوضوح', subtitle: `مفيد مع ${ctx.audience || 'جمهور متردد'} قبل تقديم العرض.` } }
        ]
      },
      {
        role: 'problem', layoutFamily: 'card', background: { mode: 'light' }, blocks: [
          { type: 'checklist', content: { title: 'الاعتراضات', items: [
            { text: 'هل الموضوع يستحق؟' },
            { text: 'هل التنفيذ معقد؟' },
            { text: 'هل سأحتاج وقتًا طويلًا؟' }
          ] } }
        ]
      },
      {
        role: 'solution', layoutFamily: 'card', background: { mode: 'light' }, blocks: [
          { type: 'text', content: { title: 'الرد المختصر', paragraph: `ابدأ بهيكل بسيط، ركّز على ${ctx.topic || 'الرسالة'}، وخلّ ChatGPT يزوّدك بالـ JSON، ثم عدّل يدويًا داخل المشروع.` } }
        ]
      },
      {
        role: 'proof', layoutFamily: 'premium', background: { mode: 'dark' }, blocks: [
          { type: 'stat', content: { title: 'لماذا هذا مناسب؟', value: 'MVP', label: 'مسار خفيف لكنه عملي', supportingText: 'أقل تعقيد، أسرع تجربة، وقابل للتطوير لاحقًا.' } }
        ]
      },
      {
        role: 'cta', layoutFamily: 'centered', background: { mode: 'light' }, blocks: [
          { type: 'cta', content: { title: 'جاهز تبدأ؟', message: ctx.offer || 'اختر Flow مناسب ثم عدّل الرسالة لتناسب البراند.', buttonText: 'طبّق هذا الـ Flow', subtext: `الجمهور: ${ctx.audience || 'عام'}` } }
        ]
      }
    ]
  }
};

const demoProject = {
  id: uid(),
  name: 'FrameX Strategy Carousel',
  description: 'نسخة v3: Flow Templates + Brand Presets + Insights + Prompt Builder',
  language: 'ar',
  dialect: 'iraqi',
  canvas: { width: 1080, height: 1350, ratio: '4:5' },
  brand: {
    brandName: 'FrameX',
    handle: '@framex',
    labelText: 'رؤية FrameX',
    footerText: '@framex'
  },
  theme: {
    preset: 'framex',
    defaultMode: 'light',
    accent: '#ff6b4a',
    showSafeArea: false
  },
  slides: FLOW_TEMPLATES.hook_problem_solution_cta.create({
    topic: 'ليش الكاروسيل عندك ما يوصل الفكرة؟',
    goal: 'هيكل أوضح + CTA أقوى',
    audience: 'أصحاب المشاريع الصغيرة',
    offer: 'خلّ ChatGPT يعطيك JSON، وبعدين حسّن النتيجة هنا.',
    tone: 'iraqi'
  }).map(ensureIds),
  meta: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: '3.0.0',
    source: 'manual'
  }
};

const state = {
  project: loadProject(),
  selectedSlideId: null,
  selectedBlockId: null,
  selectedFlowKey: 'hook_problem_solution_cta',
  zoom: 45,
  autosaveState: 'Autosaved'
};

const refs = {
  previewArea: document.getElementById('previewArea'),
  workspaceTitle: document.getElementById('workspaceTitle'),
  workspaceMeta: document.getElementById('workspaceMeta'),
  slidesList: document.getElementById('slidesList'),
  blocksList: document.getElementById('blocksList'),
  blockEditorFields: document.getElementById('blockEditorFields'),
  jsonEditor: document.getElementById('jsonEditor'),
  zoomLabel: document.getElementById('zoomLabel'),
  autosaveState: document.getElementById('autosaveState'),
  promptOutput: document.getElementById('promptOutput'),
  toast: document.getElementById('toast'),
  flowCards: document.getElementById('flowCards'),
  insightSummary: document.getElementById('insightSummary'),
  insightList: document.getElementById('insightList'),
  slideHealthList: document.getElementById('slideHealthList')
};

bootstrap();

function bootstrap() {
  normalizeProject(state.project);
  state.selectedSlideId = state.project.slides[0]?.id || null;
  state.selectedBlockId = getSelectedSlide()?.blocks[0]?.id || null;

  hydratePresetOptions();
  hydrateNarrativeOptions();
  bindTabs();
  bindProjectInputs();
  bindSlideInputs();
  bindBlockEditor();
  bindButtons();
  bindPromptBuilder();
  bindFlowInputs();
  render();
}

function hydratePresetOptions() {
  const select = document.getElementById('brandPresetSelect');
  select.innerHTML = Object.entries(BRAND_PRESETS)
    .map(([key, preset]) => `<option value="${key}">${preset.label}</option>`)
    .join('');
  setFieldValue('brandPresetSelect', state.project.theme.preset || 'framex');
}

function hydrateNarrativeOptions() {
  const select = document.getElementById('promptNarrative');
  select.innerHTML = Object.entries(FLOW_TEMPLATES)
    .map(([key, flow]) => `<option value="${key}">${flow.title}</option>`)
    .join('');
  setFieldValue('promptNarrative', state.selectedFlowKey);
}

function bindTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });
}

function bindProjectInputs() {
  bindInput('projectName', value => state.project.name = value);
  bindInput('projectDescription', value => state.project.description = value);
  bindInput('brandName', value => state.project.brand.brandName = value);
  bindInput('brandHandle', value => {
    state.project.brand.handle = value;
    state.project.brand.footerText = value;
  });
  bindInput('brandLabel', value => state.project.brand.labelText = value);
  bindInput('accentColor', value => state.project.theme.accent = value);
  bindChange('themeMode', value => state.project.theme.defaultMode = value);
  document.getElementById('safeAreaToggle').addEventListener('change', e => {
    state.project.theme.showSafeArea = e.target.checked;
    document.getElementById('toolbarSafeAreaToggle').checked = e.target.checked;
    touch();
  });
  document.getElementById('toolbarSafeAreaToggle').addEventListener('change', e => {
    state.project.theme.showSafeArea = e.target.checked;
    document.getElementById('safeAreaToggle').checked = e.target.checked;
    touch();
  });
}

function bindFlowInputs() {
  ['flowTopic', 'flowAudience', 'flowGoal', 'flowOffer', 'flowTone'].forEach(id => {
    document.getElementById(id).addEventListener(id === 'flowTone' ? 'change' : 'input', () => renderFlowCards());
  });
}

function bindSlideInputs() {
  bindChange('slideRole', value => { const slide = getSelectedSlide(); if (slide) slide.role = value; });
  bindChange('slideLayout', value => { const slide = getSelectedSlide(); if (slide) slide.layoutFamily = value; });
  bindChange('slideBgMode', value => { const slide = getSelectedSlide(); if (slide) slide.background.mode = value; });
  bindInput('slideBgImage', value => { const slide = getSelectedSlide(); if (slide) slide.background.imageUrl = value; });
  bindInput('slideBgColor', value => { const slide = getSelectedSlide(); if (slide) slide.background.customColor = value; });
}

function bindBlockEditor() {
  document.getElementById('blockTypeSelect').addEventListener('change', e => {
    const block = getSelectedBlock();
    if (!block) return;
    block.type = e.target.value;
    block.content = getDefaultContentForType(block.type);
    touch('تم تغيير نوع البلوك.');
  });
}

function bindButtons() {
  document.getElementById('addSlideBtn').addEventListener('click', addSlide);
  document.getElementById('newProjectBtn').addEventListener('click', newProject);
  document.getElementById('duplicateSlideBtn').addEventListener('click', duplicateSlide);
  document.getElementById('deleteSlideBtn').addEventListener('click', deleteSlide);
  document.getElementById('moveSlideUpBtn').addEventListener('click', () => moveSlide(-1));
  document.getElementById('moveSlideDownBtn').addEventListener('click', () => moveSlide(1));
  document.getElementById('addBlockBtn').addEventListener('click', addBlock);
  document.getElementById('duplicateBlockBtn').addEventListener('click', duplicateBlock);
  document.getElementById('deleteBlockBtn').addEventListener('click', deleteBlock);
  document.getElementById('moveBlockUpBtn').addEventListener('click', () => moveBlock(-1));
  document.getElementById('moveBlockDownBtn').addEventListener('click', () => moveBlock(1));
  document.getElementById('saveLocalBtn').addEventListener('click', saveProject);
  document.getElementById('downloadJsonBtn').addEventListener('click', downloadJson);
  document.getElementById('resetDemoBtn').addEventListener('click', resetDemo);
  document.getElementById('importJsonBtn').addEventListener('click', importJson);
  document.getElementById('copyJsonBtn').addEventListener('click', copyJson);
  document.getElementById('loadCurrentJsonBtn').addEventListener('click', () => {
    refs.jsonEditor.value = serializeProject();
    showToast('تم تحميل JSON الحالي في الحقل.');
  });
  document.getElementById('zoomInBtn').addEventListener('click', () => setZoom(state.zoom + 5));
  document.getElementById('zoomOutBtn').addEventListener('click', () => setZoom(state.zoom - 5));
  document.getElementById('applyBrandPresetBtn').addEventListener('click', applyBrandPresetFromSelect);
  document.getElementById('replaceWithTemplateBtn').addEventListener('click', applySelectedFlowTemplate);
}

function bindPromptBuilder() {
  document.getElementById('buildProjectPromptBtn').addEventListener('click', () => {
    refs.promptOutput.value = buildPrompt('project');
  });
  document.getElementById('buildBlocksPromptBtn').addEventListener('click', () => {
    refs.promptOutput.value = buildPrompt('blocks');
  });
  document.getElementById('copyPromptBtn').addEventListener('click', async () => {
    const value = refs.promptOutput.value.trim();
    if (!value) {
      showToast('ابنِ prompt أولًا.');
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      showToast('تم نسخ الـ prompt.');
    } catch {
      showToast('تعذر النسخ من هذا المتصفح.');
    }
  });
  document.getElementById('sendPromptToJsonBtn').addEventListener('click', () => {
    refs.jsonEditor.value = refs.promptOutput.value;
    showToast('تم إرسال النص إلى تبويب JSON.');
    activateTab('json');
  });
}

function bindInput(id, callback) {
  document.getElementById(id).addEventListener('input', e => {
    callback(e.target.value);
    touch();
  });
}

function bindChange(id, callback) {
  document.getElementById(id).addEventListener('change', e => {
    callback(e.target.value);
    touch();
  });
}

function addSlide() {
  const slide = createDefaultSlide(state.project.theme.defaultMode || 'light');
  state.project.slides.push(slide);
  state.selectedSlideId = slide.id;
  state.selectedBlockId = slide.blocks[0].id;
  touch('تمت إضافة شريحة جديدة.');
}

function newProject() {
  if (!confirm('إنشاء مشروع فارغ جديد؟')) return;
  state.project = createEmptyProject();
  state.selectedSlideId = state.project.slides[0].id;
  state.selectedBlockId = state.project.slides[0].blocks[0].id;
  touch('تم إنشاء مشروع فارغ.');
}

function duplicateSlide() {
  const slide = getSelectedSlide();
  if (!slide) return;
  const clone = structuredClone(slide);
  clone.id = uid();
  clone.blocks = clone.blocks.map(block => ({ ...block, id: uid() }));
  const index = getSelectedSlideIndex();
  state.project.slides.splice(index + 1, 0, clone);
  state.selectedSlideId = clone.id;
  state.selectedBlockId = clone.blocks[0]?.id || null;
  touch('تم نسخ الشريحة.');
}

function deleteSlide() {
  if (state.project.slides.length <= 1) {
    showToast('لا يمكن حذف آخر شريحة.');
    return;
  }
  const index = getSelectedSlideIndex();
  state.project.slides.splice(index, 1);
  const nextSlide = state.project.slides[Math.max(0, index - 1)] || state.project.slides[0];
  state.selectedSlideId = nextSlide?.id || null;
  state.selectedBlockId = nextSlide?.blocks[0]?.id || null;
  touch('تم حذف الشريحة.');
}

function moveSlide(direction) {
  const index = getSelectedSlideIndex();
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= state.project.slides.length) return;
  swap(state.project.slides, index, nextIndex);
  touch('تم تحريك الشريحة.');
}

function addBlock() {
  const slide = getSelectedSlide();
  if (!slide) return;
  const type = document.getElementById('newBlockType').value;
  const block = { id: uid(), type, content: getDefaultContentForType(type) };
  slide.blocks.push(block);
  state.selectedBlockId = block.id;
  touch('تمت إضافة بلوك جديد.');
}

function duplicateBlock() {
  const slide = getSelectedSlide();
  const block = getSelectedBlock();
  if (!slide || !block) return;
  const clone = structuredClone(block);
  clone.id = uid();
  const index = getSelectedBlockIndex();
  slide.blocks.splice(index + 1, 0, clone);
  state.selectedBlockId = clone.id;
  touch('تم نسخ البلوك.');
}

function deleteBlock() {
  const slide = getSelectedSlide();
  if (!slide) return;
  if (slide.blocks.length <= 1) {
    showToast('لا يمكن حذف آخر بلوك في الشريحة.');
    return;
  }
  const index = getSelectedBlockIndex();
  slide.blocks.splice(index, 1);
  state.selectedBlockId = slide.blocks[Math.max(0, index - 1)]?.id || slide.blocks[0]?.id || null;
  touch('تم حذف البلوك.');
}

function moveBlock(direction) {
  const slide = getSelectedSlide();
  const index = getSelectedBlockIndex();
  const nextIndex = index + direction;
  if (!slide || index < 0 || nextIndex < 0 || nextIndex >= slide.blocks.length) return;
  swap(slide.blocks, index, nextIndex);
  touch('تم تحريك البلوك.');
}

function applyBrandPresetFromSelect() {
  const key = document.getElementById('brandPresetSelect').value;
  applyBrandPreset(key);
}

function applyBrandPreset(key) {
  const preset = BRAND_PRESETS[key];
  if (!preset) return;
  state.project.theme.preset = key;
  state.project.theme.accent = preset.accent;
  state.project.theme.defaultMode = preset.defaultMode;
  if (!state.project.brand.handle || state.project.brand.handle === '@brand' || state.project.brand.handle === '@mybrand') {
    state.project.brand.handle = preset.handle;
    state.project.brand.footerText = preset.handle;
  }
  if (!state.project.brand.labelText || state.project.brand.labelText === 'رؤية البراند') {
    state.project.brand.labelText = preset.brandLabel;
  }
  touch(`تم تطبيق preset: ${preset.label}`);
}

function applySelectedFlowTemplate() {
  const slides = FLOW_TEMPLATES[state.selectedFlowKey].create(getFlowContext()).map(ensureIds);
  if (!slides.length) return;
  state.project.slides = slides;
  state.selectedSlideId = slides[0].id;
  state.selectedBlockId = slides[0].blocks[0]?.id || null;
  if (!state.project.name || state.project.name === 'New Carousel Project' || state.project.name === 'FrameX Strategy Carousel') {
    state.project.name = shortText(getFlowContext().topic || FLOW_TEMPLATES[state.selectedFlowKey].title, 46);
  }
  touch(`تم تطبيق Flow: ${FLOW_TEMPLATES[state.selectedFlowKey].title}`);
}

function getFlowContext() {
  return {
    topic: document.getElementById('flowTopic').value.trim() || state.project.name || 'موضوع بدون عنوان',
    audience: document.getElementById('flowAudience').value.trim() || 'جمهور عام',
    goal: document.getElementById('flowGoal').value.trim() || 'رسالة واضحة مع CTA',
    offer: document.getElementById('flowOffer').value.trim() || 'ابدأ من Flow جاهز ثم حسّن المحتوى.',
    tone: document.getElementById('flowTone').value || 'iraqi'
  };
}

function render() {
  document.documentElement.style.setProperty('--accent', state.project.theme.accent || '#ff6b4a');
  document.documentElement.style.setProperty('--preview-scale', `${state.zoom / 100}`);
  refs.zoomLabel.textContent = `${state.zoom}%`;
  refs.workspaceTitle.textContent = state.project.name || 'بدون عنوان';
  refs.workspaceMeta.textContent = `${state.project.slides.length} شرائح`;
  refs.autosaveState.textContent = state.autosaveState;

  syncProjectInputs();
  syncSlideInputs();
  syncFlowInputs();
  syncPromptInputs();
  renderFlowCards();
  renderSlidesList();
  renderBlocksList();
  renderBlockEditor();
  renderPreview();
  renderInsights();
}

function syncProjectInputs() {
  setFieldValue('projectName', state.project.name || '');
  setFieldValue('projectDescription', state.project.description || '');
  setFieldValue('brandName', state.project.brand.brandName || '');
  setFieldValue('brandHandle', state.project.brand.handle || '');
  setFieldValue('brandLabel', state.project.brand.labelText || '');
  setFieldValue('accentColor', state.project.theme.accent || '#ff6b4a');
  setFieldValue('themeMode', state.project.theme.defaultMode || 'light');
  setFieldValue('brandPresetSelect', state.project.theme.preset || 'framex');
  document.getElementById('safeAreaToggle').checked = !!state.project.theme.showSafeArea;
  document.getElementById('toolbarSafeAreaToggle').checked = !!state.project.theme.showSafeArea;
}

function syncFlowInputs() {
  if (!document.getElementById('flowTopic').value) setFieldValue('flowTopic', state.project.name || '');
  if (!document.getElementById('flowGoal').value) setFieldValue('flowGoal', state.project.description || 'رسالة واضحة + CTA');
  setFieldValue('flowTone', document.getElementById('flowTone').value || 'iraqi');
}

function syncPromptInputs() {
  if (!document.getElementById('promptTopic').value) setFieldValue('promptTopic', document.getElementById('flowTopic').value || state.project.name || '');
  if (!document.getElementById('promptGoal').value) setFieldValue('promptGoal', document.getElementById('flowGoal').value || 'رسالة واضحة + CTA');
  if (!document.getElementById('promptAudience').value) setFieldValue('promptAudience', document.getElementById('flowAudience').value || 'جمهور عام');
  setFieldValue('promptNarrative', state.selectedFlowKey);
}

function syncSlideInputs() {
  const slide = getSelectedSlide();
  if (!slide) return;
  setFieldValue('slideRole', slide.role || 'custom');
  setFieldValue('slideLayout', slide.layoutFamily || 'card');
  setFieldValue('slideBgMode', slide.background?.mode || 'light');
  setFieldValue('slideBgImage', slide.background?.imageUrl || '');
  setFieldValue('slideBgColor', slide.background?.customColor || '#f7f7f5');
}

function renderFlowCards() {
  refs.flowCards.innerHTML = '';
  Object.entries(FLOW_TEMPLATES).forEach(([key, flow]) => {
    const card = document.createElement('button');
    card.className = `flow-card ${key === state.selectedFlowKey ? 'active' : ''}`;
    card.type = 'button';
    card.innerHTML = `
      <strong>${escapeHtml(flow.title)}</strong>
      <p>${escapeHtml(flow.description)}</p>
      <span class="mini-tag">${escapeHtml(flow.tag)}</span>
    `;
    card.addEventListener('click', () => {
      state.selectedFlowKey = key;
      setFieldValue('promptNarrative', key);
      render();
    });
    refs.flowCards.appendChild(card);
  });
}

function renderSlidesList() {
  refs.slidesList.innerHTML = '';
  const tpl = document.getElementById('slideListItemTemplate');
  const slideHealth = analyzeSlides(state.project);
  state.project.slides.forEach((slide, index) => {
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector('.badge').textContent = index + 1;
    node.querySelector('.title').textContent = `${slide.role} / ${slide.layoutFamily}`;
    const warnings = slideHealth[index]?.warnings || [];
    node.querySelector('.meta').textContent = `${slide.blocks.length} بلوك${warnings.length ? ` • ${warnings.length} ملاحظات` : ''}`;
    if (slide.id === state.selectedSlideId) node.classList.add('active');
    node.addEventListener('click', () => selectSlide(slide.id));
    refs.slidesList.appendChild(node);
  });
}

function renderBlocksList() {
  refs.blocksList.innerHTML = '';
  const slide = getSelectedSlide();
  if (!slide) return;
  const tpl = document.getElementById('blockListItemTemplate');
  slide.blocks.forEach((block, index) => {
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector('.badge').textContent = index + 1;
    node.querySelector('.title').textContent = block.type;
    const issues = getBlockIssues(block);
    node.querySelector('.meta').textContent = `${getBlockPreviewText(block)}${issues.length ? ` • ${issues.length} ملاحظات` : ''}`;
    if (block.id === state.selectedBlockId) node.classList.add('active');
    node.addEventListener('click', () => {
      state.selectedBlockId = block.id;
      render();
    });
    refs.blocksList.appendChild(node);
  });
}

function renderBlockEditor() {
  const block = getSelectedBlock();
  refs.blockEditorFields.innerHTML = '';
  if (!block) {
    refs.blockEditorFields.innerHTML = '<p class="hint">اختر بلوك أولاً.</p>';
    return;
  }

  setFieldValue('blockTypeSelect', block.type);
  const fields = getEditorConfigForBlock(block);

  fields.forEach(field => {
    const wrapper = document.createElement('label');
    wrapper.textContent = field.label;
    const control = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');
    if (field.type === 'textarea') {
      control.rows = field.rows || 4;
    } else {
      control.type = field.type || 'text';
    }

    if (field.transform === 'arrayLines') {
      control.value = (block.content[field.path] || []).map(item => typeof item === 'string' ? item : item.text).join('\n');
    } else {
      control.value = getValueByPath(block.content, field.path) ?? '';
    }

    control.addEventListener('input', e => {
      if (field.transform === 'arrayLines') {
        block.content[field.path] = e.target.value
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean)
          .map(text => ({ text }));
      } else {
        setValueByPath(block.content, field.path, e.target.value);
      }
      touch();
    });

    wrapper.appendChild(control);
    refs.blockEditorFields.appendChild(wrapper);
  });

  const issues = getBlockIssues(block);
  if (issues.length) {
    const noteWrap = document.createElement('div');
    noteWrap.style.marginTop = '8px';
    noteWrap.style.display = 'flex';
    noteWrap.style.flexWrap = 'wrap';
    noteWrap.style.gap = '8px';
    issues.forEach(text => {
      const chip = document.createElement('div');
      chip.className = 'warning-chip';
      chip.textContent = text;
      noteWrap.appendChild(chip);
    });
    refs.blockEditorFields.appendChild(noteWrap);
  }
}

function renderPreview() {
  refs.previewArea.innerHTML = '';
  const slides = state.project.slides;
  slides.forEach((slide, index) => {
    const frame = document.createElement('section');
    frame.className = 'slide-frame';
    if (slide.id === state.selectedSlideId) frame.classList.add('is-selected');
    frame.addEventListener('click', () => selectSlide(slide.id));

    const surface = document.createElement('div');
    surface.className = `slide-surface ${getSurfaceModeClasses(slide)}`;
    surface.style.setProperty('--slide-bg', getSlideBackground(slide));
    surface.style.setProperty('--slide-text', getSlideTextColor(slide));

    if (slide.background?.mode === 'image' && slide.background?.imageUrl) {
      surface.style.backgroundImage = `url(${slide.background.imageUrl})`;
      surface.appendChild(el('div', 'slide-overlay'));
    }

    if (state.project.theme.showSafeArea) {
      surface.appendChild(el('div', 'safe-area'));
    }

    const top = document.createElement('div');
    top.className = 'slide-top';
    top.innerHTML = `
      <div class="slide-label">${escapeHtml(state.project.brand.labelText || state.project.brand.brandName || 'Brand')}</div>
      <div class="slide-counter">${index + 1}/${slides.length}</div>
    `;

    const body = document.createElement('div');
    body.className = 'slide-body';

    if (!slide.blocks?.length) {
      body.appendChild(el('div', 'empty-state', 'هذه الشريحة فارغة. أضف بلوك من تبويب البلوكات.'));
    } else {
      slide.blocks.forEach(block => {
        const node = renderBlock(block, slide);
        if (block.id === state.selectedBlockId && slide.id === state.selectedSlideId) {
          node.style.outline = `3px solid ${state.project.theme.accent || '#ff6b4a'}`;
          node.style.outlineOffset = '6px';
        }
        node.addEventListener('click', event => {
          event.stopPropagation();
          selectSlide(slide.id);
          state.selectedBlockId = block.id;
          render();
        });
        body.appendChild(node);
      });
    }

    const footer = document.createElement('div');
    footer.className = 'slide-footer';
    footer.appendChild(el('div', 'slide-brand', state.project.brand.footerText || state.project.brand.handle || ''));

    const progress = document.createElement('div');
    progress.className = 'progress';
    slides.forEach((_, pIndex) => {
      const span = document.createElement('span');
      if (pIndex === index) span.classList.add('active');
      progress.appendChild(span);
    });
    footer.appendChild(progress);

    surface.appendChild(top);
    surface.appendChild(body);
    surface.appendChild(footer);
    frame.appendChild(surface);
    refs.previewArea.appendChild(frame);
  });
}

function renderBlock(block, slide) {
  switch (block.type) {
    case 'hero': return renderHeroBlock(block);
    case 'text': return renderTextBlock(block, slide);
    case 'checklist': return renderChecklistBlock(block, slide);
    case 'stat': return renderStatBlock(block, slide);
    case 'image-text': return renderImageTextBlock(block, slide);
    case 'cta': return renderCtaBlock(block, slide);
    default: return el('div', 'block card-box', `نوع بلوك غير مدعوم: ${block.type}`);
  }
}

function renderHeroBlock(block) {
  const { eyebrow, title, highlightedText, subtitle } = block.content || {};
  const wrap = document.createElement('div');
  wrap.className = 'block hero';
  wrap.innerHTML = `
    ${eyebrow ? `<div class="eyebrow">${escapeHtml(eyebrow)}</div>` : ''}
    <h2>${escapeHtml(title || '')}${highlightedText ? `<br><span class="accent">${escapeHtml(highlightedText)}</span>` : ''}</h2>
    ${subtitle ? `<div class="subtitle">${escapeHtml(subtitle)}</div>` : ''}
  `;
  return wrap;
}

function renderTextBlock(block, slide) {
  const { title, paragraph } = block.content || {};
  const wrap = document.createElement('div');
  wrap.className = `block text card-box ${slide.background?.mode === 'dark' ? 'darkable' : ''}`;
  wrap.innerHTML = `
    ${title ? `<h3>${escapeHtml(title)}</h3>` : ''}
    ${paragraph ? `<p>${escapeHtml(paragraph)}</p>` : ''}
  `;
  return wrap;
}

function renderChecklistBlock(block, slide) {
  const { title, items = [] } = block.content || {};
  const wrap = document.createElement('div');
  wrap.className = `block checklist card-box ${slide.background?.mode === 'dark' ? 'darkable' : ''}`;
  if (title) wrap.innerHTML = `<h3>${escapeHtml(title)}</h3>`;
  const ul = document.createElement('ul');
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = typeof item === 'string' ? item : item.text;
    ul.appendChild(li);
  });
  wrap.appendChild(ul);
  return wrap;
}

function renderStatBlock(block, slide) {
  const { title, value, label, supportingText } = block.content || {};
  const wrap = document.createElement('div');
  wrap.className = `block stat card-box ${slide.background?.mode === 'dark' ? 'darkable' : ''}`;
  wrap.innerHTML = `
    ${title ? `<h3>${escapeHtml(title)}</h3>` : ''}
    <div class="stat-value">${escapeHtml(value || '')}</div>
    <div class="stat-label">${escapeHtml(label || '')}</div>
    ${supportingText ? `<div class="stat-support">${escapeHtml(supportingText)}</div>` : ''}
  `;
  return wrap;
}

function renderImageTextBlock(block, slide) {
  const { imageUrl, title, paragraph, caption } = block.content || {};
  const wrap = document.createElement('div');
  wrap.className = `block image-text card-box ${slide.background?.mode === 'dark' ? 'darkable' : ''}`;
  wrap.innerHTML = `
    ${imageUrl ? `<div class="image-wrap"><img src="${escapeAttr(imageUrl)}" alt="image" /></div>` : ''}
    ${title ? `<h3>${escapeHtml(title)}</h3>` : ''}
    ${paragraph ? `<p>${escapeHtml(paragraph)}</p>` : ''}
    ${caption ? `<p class="subtext">${escapeHtml(caption)}</p>` : ''}
  `;
  return wrap;
}

function renderCtaBlock(block, slide) {
  const { title, message, buttonText, subtext } = block.content || {};
  const wrap = document.createElement('div');
  wrap.className = `block cta card-box ${slide.background?.mode === 'dark' ? 'darkable' : ''}`;
  wrap.innerHTML = `
    ${title ? `<h3>${escapeHtml(title)}</h3>` : ''}
    ${message ? `<p>${escapeHtml(message)}</p>` : ''}
    ${buttonText ? `<div class="cta-button">${escapeHtml(buttonText)}</div>` : ''}
    ${subtext ? `<div class="subtext">${escapeHtml(subtext)}</div>` : ''}
  `;
  return wrap;
}

function renderInsights() {
  const summary = analyzeProject(state.project);
  refs.insightSummary.innerHTML = '';
  const summaryCards = [
    { value: state.project.slides.length, label: 'عدد الشرائح' },
    { value: summary.totalBlocks, label: 'عدد البلوكات' },
    { value: summary.criticalCount, label: 'ملاحظات حرجة' },
    { value: summary.warningCount, label: 'ملاحظات عادية' }
  ];
  summaryCards.forEach(item => {
    const card = document.createElement('div');
    card.className = 'summary-card';
    card.innerHTML = `<strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span>`;
    refs.insightSummary.appendChild(card);
  });

  refs.insightList.innerHTML = '';
  summary.insights.forEach(item => {
    const card = document.createElement('div');
    card.className = `insight-item ${item.level}`;
    card.innerHTML = `<strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.body)}</p>`;
    refs.insightList.appendChild(card);
  });
  if (!summary.insights.length) {
    refs.insightList.innerHTML = '<div class="insight-item good"><strong>الوضع جيد</strong><p>لا توجد ملاحظات حالية. يمكنك الآن تحسين النصوص أو تبديل الـ flow.</p></div>';
  }

  refs.slideHealthList.innerHTML = '';
  summary.slideHealth.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'slide-health-item';
    const warnings = item.warnings.length ? `<ul>${item.warnings.map(w => `<li>${escapeHtml(w)}</li>`).join('')}</ul>` : '<p>لا توجد ملاحظات على هذه الشريحة.</p>';
    card.innerHTML = `<strong>الشريحة ${index + 1} — ${escapeHtml(item.role)}</strong><p>${escapeHtml(item.summary)}</p>${warnings}`;
    refs.slideHealthList.appendChild(card);
  });
}

function analyzeProject(project) {
  const insights = [];
  const roles = project.slides.map(slide => slide.role);
  const totalBlocks = project.slides.reduce((sum, slide) => sum + slide.blocks.length, 0);
  const slideHealth = analyzeSlides(project);

  const hasCover = roles.includes('cover');
  const hasCta = roles.includes('cta') || project.slides.some(slide => slide.blocks.some(block => block.type === 'cta'));
  const hasProof = roles.includes('proof') || project.slides.some(slide => slide.blocks.some(block => block.type === 'stat'));
  const hasSolution = roles.includes('solution');

  if (!hasCover) insights.push({ level: 'critical', title: 'ينقصك Hook واضح', body: 'لا توجد شريحة cover. غالبًا أول شريحة تحتاج خطاف أقوى ليبدأ السحب.' });
  if (!hasSolution) insights.push({ level: 'warn', title: 'ينقصك حل واضح', body: 'المشروع يحتوي مشكلة أو شرح، لكنه لا يوضح أين الحل أو ماذا يجب أن يفعل القارئ.' });
  if (!hasProof) insights.push({ level: 'warn', title: 'ينقصك Proof أو رقم', body: 'إضافة stat أو proof ترفع الإقناع حتى لو كان المحتوى قصيرًا.' });
  if (!hasCta) insights.push({ level: 'critical', title: 'لا يوجد CTA فعلي', body: 'المشروع لا يحتوي دعوة نهائية واضحة للإجراء.' });
  if (project.slides.length > 7) insights.push({ level: 'warn', title: 'عدد الشرائح مرتفع', body: 'الكاروسيل الطويل يحتاج إيقاعًا أقوى. تأكد أن كل شريحة تضيف شيئًا جديدًا.' });
  if (project.slides.length < 3) insights.push({ level: 'warn', title: 'الهيكل قصير جدًا', body: 'قد تحتاج على الأقل Hook ثم قيمة/حل ثم CTA ليصبح التتابع أوضح.' });

  const repeatedLayouts = project.slides.every(slide => slide.layoutFamily === project.slides[0]?.layoutFamily);
  if (repeatedLayouts && project.slides.length >= 4) {
    insights.push({ level: 'warn', title: 'الإيقاع البصري متكرر', body: 'كل الشرائح تقريبًا بنفس layout. جرّب تنويع بسيط بين dark/card/premium أو شريحة stat.' });
  }

  const blockWarnings = slideHealth.flatMap(slide => slide.warnings);
  if (!blockWarnings.length) {
    insights.push({ level: 'good', title: 'الهيكل متوازن مبدئيًا', body: 'لا توجد مشاكل كثافة واضحة الآن. ركّز على تحسين العناوين أو الـ CTA.' });
  }

  return {
    totalBlocks,
    criticalCount: insights.filter(i => i.level === 'critical').length,
    warningCount: insights.filter(i => i.level === 'warn').length,
    insights,
    slideHealth
  };
}

function analyzeSlides(project) {
  return project.slides.map(slide => {
    const warnings = [];
    const totalChars = slide.blocks.reduce((sum, block) => sum + estimateBlockLength(block), 0);
    if (totalChars > 420) warnings.push('الشريحة تبدو مزدحمة نصيًا.');
    if (slide.blocks.length > 3) warnings.push('عدد البلوكات مرتفع داخل الشريحة.');
    slide.blocks.forEach(block => warnings.push(...getBlockIssues(block)));
    return {
      role: slide.role,
      summary: `layout: ${slide.layoutFamily} • blocks: ${slide.blocks.length} • density: ${densityLabel(totalChars)}`,
      warnings: dedupe(warnings)
    };
  });
}

function getBlockIssues(block) {
  const issues = [];
  const c = block.content || {};
  if (block.type === 'hero') {
    if ((c.title || '').length > 42) issues.push('عنوان الـ hero طويل');
    if ((c.subtitle || '').length > 170) issues.push('subtitle طويل نسبيًا');
  }
  if (block.type === 'text') {
    if ((c.paragraph || '').length > 220) issues.push('الفقرة طويلة');
  }
  if (block.type === 'checklist') {
    const items = c.items || [];
    if (items.length > 5) issues.push('القائمة طويلة');
    if (items.some(item => (typeof item === 'string' ? item : item.text).length > 75)) issues.push('بعض عناصر القائمة طويلة');
  }
  if (block.type === 'stat') {
    if ((c.supportingText || '').length > 110) issues.push('النص المساعد طويل');
  }
  if (block.type === 'image-text') {
    if (!c.imageUrl) issues.push('بلوك الصورة بلا صورة');
    if ((c.paragraph || '').length > 180) issues.push('شرح الصورة طويل');
  }
  if (block.type === 'cta') {
    if (!(c.buttonText || '').trim()) issues.push('CTA بلا زر');
    if ((c.message || '').length > 160) issues.push('رسالة CTA طويلة');
  }
  return dedupe(issues);
}

function estimateBlockLength(block) {
  const c = block.content || {};
  return Object.values(c).flatMap(value => Array.isArray(value) ? value.map(item => typeof item === 'string' ? item : item.text) : [value]).join(' ').length;
}

function densityLabel(chars) {
  if (chars > 420) return 'heavy';
  if (chars > 230) return 'medium';
  return 'light';
}

function getSurfaceModeClasses(slide) {
  const classes = [];
  if ((slide.background?.mode || state.project.theme.defaultMode) === 'dark' || slide.layoutFamily === 'dark' || slide.layoutFamily === 'premium') classes.push('dark');
  if ((slide.background?.mode || '') === 'image') classes.push('bg-image', 'dark');
  if ((slide.background?.mode || '') !== 'image' && slide.layoutFamily !== 'minimal') classes.push('grid');
  return classes.join(' ');
}

function getSlideBackground(slide) {
  if (slide.background?.mode === 'custom') return slide.background.customColor || '#f7f7f5';
  if (slide.background?.mode === 'dark' || slide.layoutFamily === 'dark' || slide.layoutFamily === 'premium') return '#0f0f10';
  return '#f7f7f5';
}

function getSlideTextColor(slide) {
  if (slide.background?.mode === 'dark' || slide.layoutFamily === 'dark' || slide.layoutFamily === 'premium' || slide.background?.mode === 'image') return '#ffffff';
  return '#111827';
}

function getEditorConfigForBlock(block) {
  switch (block.type) {
    case 'hero':
      return [
        { label: 'Eyebrow', path: 'eyebrow' },
        { label: 'العنوان', path: 'title' },
        { label: 'النص المميز', path: 'highlightedText' },
        { label: 'النص الفرعي', path: 'subtitle', type: 'textarea', rows: 4 },
      ];
    case 'text':
      return [
        { label: 'العنوان', path: 'title' },
        { label: 'الفقرة', path: 'paragraph', type: 'textarea', rows: 6 },
      ];
    case 'checklist':
      return [
        { label: 'العنوان', path: 'title' },
        { label: 'العناصر (كل سطر = عنصر)', path: 'items', type: 'textarea', rows: 6, transform: 'arrayLines' },
      ];
    case 'stat':
      return [
        { label: 'العنوان', path: 'title' },
        { label: 'القيمة الكبيرة', path: 'value' },
        { label: 'الوصف', path: 'label' },
        { label: 'نص مساعد', path: 'supportingText', type: 'textarea', rows: 4 },
      ];
    case 'image-text':
      return [
        { label: 'رابط الصورة', path: 'imageUrl' },
        { label: 'العنوان', path: 'title' },
        { label: 'النص', path: 'paragraph', type: 'textarea', rows: 5 },
        { label: 'Caption', path: 'caption' },
      ];
    case 'cta':
      return [
        { label: 'العنوان', path: 'title' },
        { label: 'الرسالة', path: 'message', type: 'textarea', rows: 5 },
        { label: 'نص الزر', path: 'buttonText' },
        { label: 'نص إضافي', path: 'subtext' },
      ];
    default:
      return [];
  }
}

function getDefaultContentForType(type) {
  switch (type) {
    case 'hero': return { eyebrow: 'عنوان صغير', title: 'عنوان رئيسي', highlightedText: 'نص مميز', subtitle: 'سطر توضيحي مختصر.' };
    case 'text': return { title: 'عنوان بلوك', paragraph: 'اكتب النص هنا.' };
    case 'checklist': return { title: 'عنوان قائمة', items: [{ text: 'نقطة أولى' }, { text: 'نقطة ثانية' }, { text: 'نقطة ثالثة' }] };
    case 'stat': return { title: 'رقم مهم', value: '70%', label: 'وصف مختصر للرقم', supportingText: 'تفصيل بسيط.' };
    case 'image-text': return { imageUrl: '', title: 'عنوان مع صورة', paragraph: 'اكتب الشرح هنا.', caption: 'ملاحظة صغيرة' };
    case 'cta': return { title: 'دعوة للإجراء', message: 'اكتب الرسالة التسويقية هنا.', buttonText: 'اتخذ إجراء', subtext: 'شرح أو توضيح إضافي' };
    default: return {};
  }
}

function getBlockPreviewText(block) {
  const c = block.content || {};
  return shortText(c.title || c.message || c.label || c.paragraph || c.subtitle || 'بدون نص', 46);
}

function getSelectedSlide() {
  return state.project.slides.find(slide => slide.id === state.selectedSlideId) || null;
}

function getSelectedSlideIndex() {
  return state.project.slides.findIndex(slide => slide.id === state.selectedSlideId);
}

function getSelectedBlock() {
  const slide = getSelectedSlide();
  return slide?.blocks.find(block => block.id === state.selectedBlockId) || null;
}

function getSelectedBlockIndex() {
  const slide = getSelectedSlide();
  return slide?.blocks.findIndex(block => block.id === state.selectedBlockId) ?? -1;
}

function selectSlide(slideId) {
  const slide = state.project.slides.find(item => item.id === slideId);
  if (!slide) return;
  state.selectedSlideId = slide.id;
  state.selectedBlockId = slide.blocks[0]?.id || null;
  render();
}

function loadProject() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : structuredClone(demoProject);
  } catch {
    return structuredClone(demoProject);
  }
}

function saveProject() {
  localStorage.setItem(STORAGE_KEY, serializeProject());
  state.autosaveState = 'Saved';
  render();
  showToast('تم الحفظ محليًا.');
}

function serializeProject() {
  return JSON.stringify(state.project, null, 2);
}

function downloadJson() {
  const blob = new Blob([serializeProject()], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${slugify(state.project.name || 'carousel-project')}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('تم تنزيل JSON.');
}

async function copyJson() {
  try {
    await navigator.clipboard.writeText(serializeProject());
    showToast('تم نسخ JSON.');
  } catch {
    showToast('تعذر النسخ من المتصفح الحالي.');
  }
}

function importJson() {
  try {
    const parsed = parseLooseJson(refs.jsonEditor.value);
    const importedProject = parseImportedData(parsed);
    normalizeProject(importedProject);
    state.project = importedProject;
    state.selectedSlideId = state.project.slides[0]?.id || null;
    state.selectedBlockId = state.project.slides[0]?.blocks?.[0]?.id || null;
    touch('تم استيراد المشروع بنجاح.');
  } catch (error) {
    showToast(error.message || 'JSON غير صالح.');
  }
}

function resetDemo() {
  if (!confirm('إرجاع المشروع إلى نسخة الديمو؟')) return;
  state.project = structuredClone(demoProject);
  state.selectedSlideId = state.project.slides[0]?.id || null;
  state.selectedBlockId = state.project.slides[0]?.blocks?.[0]?.id || null;
  touch('تم استرجاع الديمو.');
}

function setZoom(next) {
  state.zoom = Math.max(25, Math.min(80, next));
  render();
}

function touch(message = 'Autosaved') {
  state.project.meta = state.project.meta || {};
  state.project.meta.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, serializeProject());
  state.autosaveState = 'Autosaved';
  render();
  if (message && message !== 'Autosaved') showToast(message);
}

function parseLooseJson(text) {
  const cleaned = String(text || '').trim();
  if (!cleaned) throw new Error('الحقل فارغ.');
  const withoutFences = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
  try {
    return JSON.parse(withoutFences);
  } catch {
    const start = withoutFences.indexOf('{');
    const end = withoutFences.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(withoutFences.slice(start, end + 1));
    }
    throw new Error('تعذر استخراج JSON صالح من النص.');
  }
}

function parseImportedData(parsed) {
  if (Array.isArray(parsed)) {
    return wrapSlidesAsProject(parsed);
  }

  if (parsed && Array.isArray(parsed.slides)) {
    return parsed.name || parsed.brand || parsed.theme ? parsed : wrapSlidesAsProject(parsed.slides);
  }

  if (parsed && Array.isArray(parsed.blocks)) {
    return wrapBlocksAsProject(parsed.blocks);
  }

  throw new Error('الصيغة غير صحيحة. المقبول: مشروع كامل أو slides أو blocks.');
}

function wrapSlidesAsProject(slides) {
  return {
    id: uid(),
    name: 'Imported Slides Project',
    description: 'تم إنشاؤه من slides فقط',
    language: 'ar',
    dialect: 'iraqi',
    canvas: { width: 1080, height: 1350, ratio: '4:5' },
    brand: {
      brandName: 'Brand',
      handle: '@brand',
      labelText: 'Brand Vision',
      footerText: '@brand',
    },
    theme: { preset: 'framex', defaultMode: 'light', accent: '#ff6b4a', showSafeArea: false },
    slides: slides.map(ensureIds),
    meta: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), version: '3.0.0', source: 'imported' }
  };
}

function wrapBlocksAsProject(blocks) {
  return wrapSlidesAsProject([
    {
      id: uid(),
      role: 'custom',
      layoutFamily: 'card',
      background: { mode: 'light' },
      blocks,
    }
  ]);
}

function normalizeProject(project) {
  project.id ||= uid();
  project.name ||= 'Untitled Carousel';
  project.description ||= '';
  project.language ||= 'ar';
  project.dialect ||= 'iraqi';
  project.canvas ||= { width: 1080, height: 1350, ratio: '4:5' };
  project.brand ||= {};
  project.brand.brandName ||= 'Brand';
  project.brand.handle ||= '@brand';
  project.brand.labelText ||= project.brand.brandName;
  project.brand.footerText ||= project.brand.handle;
  project.theme ||= {};
  project.theme.preset ||= 'framex';
  project.theme.defaultMode ||= 'light';
  project.theme.accent ||= '#ff6b4a';
  project.theme.showSafeArea ||= false;
  project.meta ||= {};
  project.meta.version ||= '3.0.0';
  project.meta.source ||= 'manual';
  project.meta.createdAt ||= new Date().toISOString();
  project.meta.updatedAt ||= new Date().toISOString();
  project.slides ||= [];

  if (!project.slides.length) project.slides.push(createDefaultSlide(project.theme.defaultMode));

  project.slides = project.slides.map(slide => ensureIds(slide, project.theme.defaultMode));
}

function ensureIds(slide, mode = 'light') {
  slide.id ||= uid();
  slide.role ||= 'custom';
  slide.layoutFamily ||= 'card';
  slide.background ||= { mode };
  slide.background.mode ||= mode;
  slide.blocks ||= [{ id: uid(), type: 'text', content: getDefaultContentForType('text') }];
  slide.blocks = slide.blocks.map(block => {
    block.id ||= uid();
    block.type ||= 'text';
    block.content ||= getDefaultContentForType(block.type);
    return block;
  });
  return slide;
}

function createDefaultSlide(mode = 'light') {
  return ensureIds({
    role: 'custom',
    layoutFamily: 'card',
    background: { mode },
    blocks: [{ type: 'text', content: getDefaultContentForType('text') }]
  }, mode);
}

function createEmptyProject() {
  return {
    id: uid(),
    name: 'New Carousel Project',
    description: '',
    language: 'ar',
    dialect: 'iraqi',
    canvas: { width: 1080, height: 1350, ratio: '4:5' },
    brand: {
      brandName: 'My Brand',
      handle: '@mybrand',
      labelText: 'رؤية البراند',
      footerText: '@mybrand',
    },
    theme: { preset: 'framex', defaultMode: 'light', accent: '#ff6b4a', showSafeArea: false },
    slides: [createDefaultSlide('light')],
    meta: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), version: '3.0.0', source: 'manual' }
  };
}

function buildPrompt(mode) {
  const topic = document.getElementById('promptTopic').value.trim() || 'موضوع بدون عنوان';
  const goal = document.getElementById('promptGoal').value.trim() || 'توعية + CTA';
  const audience = document.getElementById('promptAudience').value.trim() || 'جمهور عام';
  const tone = document.getElementById('promptTone').value;
  const slideCount = Math.max(1, Number(document.getElementById('promptSlides').value || 5));
  const postType = document.getElementById('promptPostType').value;
  const narrativeKey = document.getElementById('promptNarrative').value;
  const narrativeTitle = FLOW_TEMPLATES[narrativeKey]?.title || 'Hook → Problem → Solution → CTA';
  const brandName = state.project.brand.brandName || 'Brand';
  const brandHandle = state.project.brand.handle || '@brand';
  const brandLabel = state.project.brand.labelText || brandName;
  const accent = state.project.theme.accent || '#ff6b4a';

  if (mode === 'blocks') {
    return `أعطني JSON صالح فقط بدون أي شرح أو markdown.\n\nأريد بلوكات لشريحة واحدة داخل carousel.\n\nالموضوع: ${topic}\nالهدف: ${goal}\nالجمهور: ${audience}\nنوع المنشور: ${postType}\nالنبرة: ${tone}\nالبراند: ${brandName}\n\nأرجع Object واحد بهذه الصيغة فقط:\n{\n  "blocks": [\n    {\n      "type": "hero | text | checklist | stat | image-text | cta",\n      "content": {}\n    }\n  ]\n}\n\nالقواعد:\n- استخدم العربية.\n- لا تكتب أي تعليق خارج JSON.\n- ركز على slide واحدة قوية ومقروءة.\n- إذا كان النوع checklist فليكن items مصفوفة objects بهذا الشكل: { "text": "..." }.\n- إذا كان النوع cta فأضف title و message و buttonText.\n- إذا كان النوع stat فأضف value و label.\n- اجعل النصوص قصيرة ومناسبة لشريحة 1080x1350.`;
  }

  return `أعطني JSON صالح فقط بدون أي شرح أو markdown.\n\nأريد Project JSON كامل لبناء carousel داخل engine.\n\nالموضوع: ${topic}\nالهدف: ${goal}\nالجمهور: ${audience}\nنوع المنشور: ${postType}\nالسرد المطلوب: ${narrativeTitle}\nالنبرة: ${tone}\nعدد الشرائح: ${slideCount}\n\nسياق البراند:\n- brandName: ${brandName}\n- handle: ${brandHandle}\n- labelText: ${brandLabel}\n- accent: ${accent}\n\nأرجع Object واحد بهذه الصيغة العامة:\n{\n  "name": "...",\n  "description": "...",\n  "language": "ar",\n  "dialect": "iraqi",\n  "brand": {\n    "brandName": "${brandName}",\n    "handle": "${brandHandle}",\n    "labelText": "${brandLabel}",\n    "footerText": "${brandHandle}"\n  },\n  "theme": {\n    "preset": "framex",\n    "defaultMode": "${state.project.theme.defaultMode || 'light'}",\n    "accent": "${accent}"\n  },\n  "slides": [\n    {\n      "role": "cover | intro | problem | solution | proof | cta | summary | custom",\n      "layoutFamily": "centered | card | stack | top-image | dark | premium | minimal",\n      "background": {\n        "mode": "light | dark | image | custom",\n        "imageUrl": "",\n        "customColor": ""\n      },\n      "blocks": [\n        { "type": "hero", "content": { "eyebrow": "", "title": "", "highlightedText": "", "subtitle": "" } }\n      ]\n    }\n  ]\n}\n\nالقواعد:\n- لا تكتب أي شيء خارج JSON.\n- اتبع السرد: ${narrativeTitle}.\n- استخدم ${slideCount} شرائح تقريبًا.\n- استخدم فقط الأنواع المدعومة: hero, text, checklist, stat, image-text, cta.\n- إذا استخدمت checklist فليكن items مصفوفة objects بهذا الشكل: { "text": "..." }.\n- اجعل النصوص قصيرة وقابلة للعرض داخل شريحة 1080x1350.\n- أضف CTA نهائي واضح.\n- إذا أمكن، أضف شريحة proof أو stat واحدة على الأقل.`;
}

function activateTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(x => x.classList.remove('active'));
  document.querySelector(`.tab-btn[data-tab="${tabName}"]`)?.classList.add('active');
  document.getElementById(`tab-${tabName}`)?.classList.add('active');
}

function showToast(message) {
  refs.toast.textContent = message;
  refs.toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => refs.toast.classList.remove('show'), 1800);
}

function setFieldValue(id, value) {
  const field = document.getElementById(id);
  if (!field) return;
  if (field.type === 'checkbox') {
    field.checked = !!value;
    return;
  }
  if (field.value !== String(value ?? '')) field.value = value ?? '';
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-_\u0600-\u06FF]/g, '');
}

function getValueByPath(obj, path) {
  return obj?.[path];
}

function setValueByPath(obj, path, value) {
  obj[path] = value;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function shortText(value, max) {
  const text = String(value || '').trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function dedupe(items) {
  return [...new Set(items.filter(Boolean))];
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(value) {
  return String(value ?? '').replace(/"/g, '&quot;');
}
