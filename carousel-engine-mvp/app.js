const STORAGE_KEY = 'carousel-blocks-engine-project-v2';

const demoProject = {
  id: uid(),
  name: 'FrameX Sales Carousel',
  description: 'نسخة MVP بنظام بلوكات',
  language: 'ar',
  dialect: 'iraqi',
  canvas: { width: 1080, height: 1350, ratio: '4:5' },
  brand: {
    brandName: 'FrameX',
    handle: '@framex',
    labelText: 'رؤية FrameX',
    footerText: '@framex',
  },
  theme: {
    preset: 'framex-default',
    defaultMode: 'light',
    accent: '#ff6b4a',
  },
  slides: [
    {
      id: uid(),
      role: 'cover',
      layoutFamily: 'dark',
      background: {
        mode: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1400&auto=format&fit=crop'
      },
      blocks: [
        {
          id: uid(),
          type: 'hero',
          content: {
            eyebrow: 'المشكلة مو بزر التمويل',
            title: 'مموّل إعلانك',
            highlightedText: 'بس ماكو مبيعات؟',
            subtitle: 'حوّل فكرتك إلى بلوكات واضحة وخذ المحتوى من ChatGPT كـ JSON بدل كتابة شريحة كاملة من الصفر.'
          }
        }
      ]
    },
    {
      id: uid(),
      role: 'problem',
      layoutFamily: 'card',
      background: { mode: 'light' },
      blocks: [
        {
          id: uid(),
          type: 'text',
          content: {
            title: 'وين المشكلة الحقيقية؟',
            paragraph: 'أحيانًا الإعلان يوصل، لكن المحتوى نفسه ما يقنع. لذلك بدال ما تبني كل شريحة يدويًا، استخدم بلوكات واضحة ومتكررة وسهلة التحرير.'
          }
        },
        {
          id: uid(),
          type: 'checklist',
          content: {
            title: 'أخطاء متكررة',
            items: [
              { text: 'نص طويل داخل شريحة وحدة' },
              { text: 'ماكو تدرج منطقي بين الشرائح' },
              { text: 'الـ CTA ضعيف أو متأخر' }
            ]
          }
        }
      ]
    },
    {
      id: uid(),
      role: 'solution',
      layoutFamily: 'premium',
      background: { mode: 'dark' },
      blocks: [
        {
          id: uid(),
          type: 'stat',
          content: {
            title: 'الفكرة الصح',
            value: '6',
            label: 'أنواع بلوكات كافية للنسخة الأولى',
            supportingText: 'Hero + Text + Checklist + Stat + ImageText + CTA'
          }
        },
        {
          id: uid(),
          type: 'cta',
          content: {
            title: 'شغلك يصير أسرع',
            message: 'ولّد المحتوى من ChatGPT كـ JSON، وبعدها عدّل عليه هنا بسرعة.',
            buttonText: 'جرّب الاستيراد الآن',
            subtext: 'استخدم تبويب Prompts كنقطة بداية.'
          }
        }
      ]
    }
  ],
  meta: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: '2.0.0',
    source: 'manual'
  }
};

const state = {
  project: loadProject(),
  selectedSlideId: null,
  selectedBlockId: null,
  zoom: 45,
  promptMode: 'project',
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
};

bootstrap();

function bootstrap() {
  normalizeProject(state.project);
  state.selectedSlideId = state.project.slides[0]?.id || null;
  state.selectedBlockId = getSelectedSlide()?.blocks[0]?.id || null;

  bindTabs();
  bindProjectInputs();
  bindSlideInputs();
  bindBlockEditor();
  bindButtons();
  bindPromptBuilder();
  render();
}

function bindTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
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
}

function bindPromptBuilder() {
  document.getElementById('buildProjectPromptBtn').addEventListener('click', () => {
    state.promptMode = 'project';
    refs.promptOutput.value = buildPrompt('project');
  });
  document.getElementById('buildBlocksPromptBtn').addEventListener('click', () => {
    state.promptMode = 'blocks';
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

function render() {
  document.documentElement.style.setProperty('--accent', state.project.theme.accent || '#ff6b4a');
  document.documentElement.style.setProperty('--preview-scale', `${state.zoom / 100}`);
  refs.zoomLabel.textContent = `${state.zoom}%`;
  refs.workspaceTitle.textContent = state.project.name || 'بدون عنوان';
  refs.workspaceMeta.textContent = `${state.project.slides.length} شرائح`;
  refs.autosaveState.textContent = state.autosaveState;

  syncProjectInputs();
  syncSlideInputs();
  renderSlidesList();
  renderBlocksList();
  renderBlockEditor();
  renderPreview();
}

function syncProjectInputs() {
  setFieldValue('projectName', state.project.name || '');
  setFieldValue('projectDescription', state.project.description || '');
  setFieldValue('brandName', state.project.brand.brandName || '');
  setFieldValue('brandHandle', state.project.brand.handle || '');
  setFieldValue('brandLabel', state.project.brand.labelText || '');
  setFieldValue('accentColor', state.project.theme.accent || '#ff6b4a');
  setFieldValue('themeMode', state.project.theme.defaultMode || 'light');
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

function renderSlidesList() {
  refs.slidesList.innerHTML = '';
  const tpl = document.getElementById('slideListItemTemplate');
  state.project.slides.forEach((slide, index) => {
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector('.badge').textContent = index + 1;
    node.querySelector('.title').textContent = `${slide.role} / ${slide.layoutFamily}`;
    node.querySelector('.meta').textContent = `${slide.blocks.length} بلوك`;
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
    node.querySelector('.meta').textContent = getBlockPreviewText(block);
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
  return c.title || c.message || c.label || c.paragraph || c.subtitle || 'بدون نص';
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
    const parsed = JSON.parse(refs.jsonEditor.value);
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
    theme: { preset: 'default', defaultMode: 'light', accent: '#ff6b4a' },
    slides,
    meta: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), version: '2.0.0', source: 'imported' }
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
  project.theme.preset ||= 'default';
  project.theme.defaultMode ||= 'light';
  project.theme.accent ||= '#ff6b4a';
  project.meta ||= {};
  project.meta.version ||= '2.0.0';
  project.meta.source ||= 'manual';
  project.meta.createdAt ||= new Date().toISOString();
  project.meta.updatedAt ||= new Date().toISOString();
  project.slides ||= [];

  if (!project.slides.length) project.slides.push(createDefaultSlide(project.theme.defaultMode));

  project.slides = project.slides.map(slide => {
    slide.id ||= uid();
    slide.role ||= 'custom';
    slide.layoutFamily ||= 'card';
    slide.background ||= { mode: project.theme.defaultMode };
    slide.background.mode ||= project.theme.defaultMode;
    slide.blocks ||= [{ id: uid(), type: 'text', content: getDefaultContentForType('text') }];
    slide.blocks = slide.blocks.map(block => {
      block.id ||= uid();
      block.type ||= 'text';
      block.content ||= getDefaultContentForType(block.type);
      return block;
    });
    return slide;
  });
}

function createDefaultSlide(mode = 'light') {
  return {
    id: uid(),
    role: 'custom',
    layoutFamily: 'card',
    background: { mode },
    blocks: [{ id: uid(), type: 'text', content: getDefaultContentForType('text') }]
  };
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
    theme: { preset: 'default', defaultMode: 'light', accent: '#ff6b4a' },
    slides: [createDefaultSlide('light')],
    meta: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), version: '2.0.0', source: 'manual' }
  };
}

function buildPrompt(mode) {
  const topic = document.getElementById('promptTopic').value.trim() || 'موضوع بدون عنوان';
  const goal = document.getElementById('promptGoal').value.trim() || 'توعية + CTA';
  const audience = document.getElementById('promptAudience').value.trim() || 'جمهور عام';
  const tone = document.getElementById('promptTone').value;
  const slideCount = Math.max(1, Number(document.getElementById('promptSlides').value || 5));

  if (mode === 'blocks') {
    return `أعطني JSON صالح فقط بدون أي شرح أو markdown.\n\nأريد بلوكات لشريحة واحدة داخل carousel.\n\nالموضوع: ${topic}\nالهدف: ${goal}\nالجمهور: ${audience}\nالنبرة: ${tone}\n\nأرجع Object واحد بهذه الصيغة فقط:\n{\n  "blocks": [\n    {\n      "type": "hero | text | checklist | stat | image-text | cta",\n      "content": {}\n    }\n  ]\n}\n\nالقواعد:\n- استخدم العربية.\n- لا تكتب أي تعليق خارج JSON.\n- إذا كان النوع checklist فليكن items مصفوفة objects بهذا الشكل: { "text": "..." }.\n- إذا كان النوع cta فأضف title و message و buttonText.\n- إذا كان النوع stat فأضف value و label.\n- اجعل النصوص قصيرة ومناسبة للكاروسيل.`;
  }

  return `أعطني JSON صالح فقط بدون أي شرح أو markdown.\n\nأريد Project JSON كامل لبناء carousel داخل engine.\n\nالموضوع: ${topic}\nالهدف: ${goal}\nالجمهور: ${audience}\nالنبرة: ${tone}\nعدد الشرائح: ${slideCount}\n\nأرجع Object واحد بهذه الصيغة العامة:\n{\n  "name": "...",\n  "description": "...",\n  "language": "ar",\n  "dialect": "iraqi",\n  "brand": {\n    "brandName": "FrameX",\n    "handle": "@framex",\n    "labelText": "رؤية FrameX",\n    "footerText": "@framex"\n  },\n  "theme": {\n    "preset": "framex-default",\n    "defaultMode": "light",\n    "accent": "#ff6b4a"\n  },\n  "slides": [\n    {\n      "role": "cover | intro | problem | solution | proof | cta | summary | custom",\n      "layoutFamily": "centered | card | stack | top-image | dark | premium | minimal",\n      "background": {\n        "mode": "light | dark | image | custom",\n        "imageUrl": "",\n        "customColor": ""\n      },\n      "blocks": [\n        { "type": "hero", "content": { "eyebrow": "", "title": "", "highlightedText": "", "subtitle": "" } }\n      ]\n    }\n  ]\n}\n\nالقواعد:\n- لا تكتب أي شيء خارج JSON.\n- استخدم ${slideCount} شرائح تقريبًا.\n- اجعل flow منطقي: hook ثم problem ثم solution ثم CTA إن كان مناسبًا.\n- استخدم فقط الأنواع المدعومة: hero, text, checklist, stat, image-text, cta.\n- إذا استخدمت checklist فليكن items مصفوفة objects بهذا الشكل: { "text": "..." }.\n- اجعل النصوص قصيرة وقابلة للعرض داخل شريحة 1080x1350.`;
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
  if (field && field.value !== value) field.value = value;
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
