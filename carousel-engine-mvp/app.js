const STORAGE_KEY = 'carousel-blocks-engine-project-v1';

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
            subtitle: 'هذا الـ engine يخليك تبني المحتوى كبلوكات بدل كتابة شريحة كاملة من الصفر.'
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
            subtext: 'استخدم ملف sample-project.json كنقطة بداية.'
          }
        }
      ]
    }
  ],
  meta: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: '1.0.0',
    source: 'manual'
  }
};

const state = {
  project: loadProject(),
  selectedSlideId: null,
  selectedBlockId: null,
  zoom: 45,
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
};

bootstrap();

function bootstrap() {
  if (!state.project.slides.length) {
    state.project.slides = structuredClone(demoProject.slides);
  }
  state.selectedSlideId = state.project.slides[0]?.id || null;
  state.selectedBlockId = getSelectedSlide()?.blocks[0]?.id || null;

  bindTabs();
  bindProjectInputs();
  bindSlideInputs();
  bindBlockEditor();
  bindButtons();
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
  const projectName = document.getElementById('projectName');
  const brandName = document.getElementById('brandName');
  const brandHandle = document.getElementById('brandHandle');
  const brandLabel = document.getElementById('brandLabel');
  const accentColor = document.getElementById('accentColor');
  const themeMode = document.getElementById('themeMode');

  projectName.addEventListener('input', e => {
    state.project.name = e.target.value;
    touch();
  });
  brandName.addEventListener('input', e => {
    state.project.brand.brandName = e.target.value;
    touch();
  });
  brandHandle.addEventListener('input', e => {
    state.project.brand.handle = e.target.value;
    state.project.brand.footerText = e.target.value;
    touch();
  });
  brandLabel.addEventListener('input', e => {
    state.project.brand.labelText = e.target.value;
    touch();
  });
  accentColor.addEventListener('input', e => {
    state.project.theme.accent = e.target.value;
    touch();
  });
  themeMode.addEventListener('change', e => {
    state.project.theme.defaultMode = e.target.value;
    touch();
  });
}

function bindSlideInputs() {
  document.getElementById('slideRole').addEventListener('change', e => {
    const slide = getSelectedSlide();
    if (!slide) return;
    slide.role = e.target.value;
    touch();
  });
  document.getElementById('slideLayout').addEventListener('change', e => {
    const slide = getSelectedSlide();
    if (!slide) return;
    slide.layoutFamily = e.target.value;
    touch();
  });
  document.getElementById('slideBgMode').addEventListener('change', e => {
    const slide = getSelectedSlide();
    if (!slide) return;
    slide.background.mode = e.target.value;
    touch();
  });
  document.getElementById('slideBgImage').addEventListener('input', e => {
    const slide = getSelectedSlide();
    if (!slide) return;
    slide.background.imageUrl = e.target.value;
    touch();
  });
  document.getElementById('slideBgColor').addEventListener('input', e => {
    const slide = getSelectedSlide();
    if (!slide) return;
    slide.background.customColor = e.target.value;
    touch();
  });
}

function bindBlockEditor() {
  document.getElementById('blockTypeSelect').addEventListener('change', e => {
    const block = getSelectedBlock();
    if (!block) return;
    block.type = e.target.value;
    block.content = getDefaultContentForType(block.type);
    touch();
  });
}

function bindButtons() {
  document.getElementById('addSlideBtn').addEventListener('click', addSlide);
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
  document.getElementById('loadCurrentJsonBtn').addEventListener('click', () => refs.jsonEditor.value = serializeProject());
  document.getElementById('zoomInBtn').addEventListener('click', () => setZoom(state.zoom + 5));
  document.getElementById('zoomOutBtn').addEventListener('click', () => setZoom(state.zoom - 5));
}

function addSlide() {
  const slide = {
    id: uid(),
    role: 'custom',
    layoutFamily: 'card',
    background: { mode: state.project.theme.defaultMode || 'light' },
    blocks: [{ id: uid(), type: 'text', content: getDefaultContentForType('text') }]
  };
  state.project.slides.push(slide);
  state.selectedSlideId = slide.id;
  state.selectedBlockId = slide.blocks[0].id;
  touch();
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
  touch();
}

function deleteSlide() {
  if (state.project.slides.length <= 1) {
    alert('لا يمكن حذف آخر شريحة.');
    return;
  }
  const index = getSelectedSlideIndex();
  state.project.slides.splice(index, 1);
  const nextSlide = state.project.slides[Math.max(0, index - 1)] || state.project.slides[0];
  state.selectedSlideId = nextSlide?.id || null;
  state.selectedBlockId = nextSlide?.blocks[0]?.id || null;
  touch();
}

function moveSlide(direction) {
  const index = getSelectedSlideIndex();
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= state.project.slides.length) return;
  swap(state.project.slides, index, nextIndex);
  touch();
}

function addBlock() {
  const slide = getSelectedSlide();
  if (!slide) return;
  const type = document.getElementById('newBlockType').value;
  const block = { id: uid(), type, content: getDefaultContentForType(type) };
  slide.blocks.push(block);
  state.selectedBlockId = block.id;
  touch();
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
  touch();
}

function deleteBlock() {
  const slide = getSelectedSlide();
  if (!slide) return;
  if (slide.blocks.length <= 1) {
    alert('لا يمكن حذف آخر بلوك في الشريحة.');
    return;
  }
  const index = getSelectedBlockIndex();
  slide.blocks.splice(index, 1);
  state.selectedBlockId = slide.blocks[Math.max(0, index - 1)]?.id || slide.blocks[0]?.id || null;
  touch();
}

function moveBlock(direction) {
  const slide = getSelectedSlide();
  const index = getSelectedBlockIndex();
  const nextIndex = index + direction;
  if (!slide || index < 0 || nextIndex < 0 || nextIndex >= slide.blocks.length) return;
  swap(slide.blocks, index, nextIndex);
  touch();
}

function render() {
  document.documentElement.style.setProperty('--accent', state.project.theme.accent || '#ff6b4a');
  document.documentElement.style.setProperty('--preview-scale', `${state.zoom / 100}`);
  refs.zoomLabel.textContent = `${state.zoom}%`;
  refs.workspaceTitle.textContent = state.project.name || 'بدون عنوان';
  refs.workspaceMeta.textContent = `${state.project.slides.length} شرائح`;

  syncProjectInputs();
  syncSlideInputs();
  renderSlidesList();
  renderBlocksList();
  renderBlockEditor();
  renderPreview();
}

function syncProjectInputs() {
  document.getElementById('projectName').value = state.project.name || '';
  document.getElementById('brandName').value = state.project.brand.brandName || '';
  document.getElementById('brandHandle').value = state.project.brand.handle || '';
  document.getElementById('brandLabel').value = state.project.brand.labelText || '';
  document.getElementById('accentColor').value = state.project.theme.accent || '#ff6b4a';
  document.getElementById('themeMode').value = state.project.theme.defaultMode || 'light';
}

function syncSlideInputs() {
  const slide = getSelectedSlide();
  if (!slide) return;
  document.getElementById('slideRole').value = slide.role || 'custom';
  document.getElementById('slideLayout').value = slide.layoutFamily || 'card';
  document.getElementById('slideBgMode').value = slide.background?.mode || 'light';
  document.getElementById('slideBgImage').value = slide.background?.imageUrl || '';
  document.getElementById('slideBgColor').value = slide.background?.customColor || '#f7f7f5';
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
    node.addEventListener('click', () => {
      state.selectedSlideId = slide.id;
      state.selectedBlockId = slide.blocks[0]?.id || null;
      render();
    });
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
  document.getElementById('blockTypeSelect').value = block.type;

  const fields = getEditorConfigForBlock(block);
  fields.forEach(field => {
    const wrapper = document.createElement('label');
    wrapper.textContent = field.label;
    let control;
    if (field.type === 'textarea') {
      control = document.createElement('textarea');
      control.rows = field.rows || 4;
    } else {
      control = document.createElement('input');
      control.type = field.type || 'text';
    }
    control.value = getValueByPath(block.content, field.path) ?? '';
    control.addEventListener('input', e => {
      setValueByPath(block.content, field.path, e.target.value);
      if (field.transform === 'arrayLines') {
        block.content[field.path] = e.target.value
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean)
          .map(text => ({ text }));
      }
      touch();
    });

    if (field.transform === 'arrayLines') {
      control.value = (block.content[field.path] || []).map(item => item.text || item).join('\n');
    }

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
    const surface = document.createElement('div');
    surface.className = `slide-surface ${getSurfaceModeClasses(slide)}`;
    surface.style.setProperty('--slide-bg', getSlideBackground(slide));
    surface.style.setProperty('--slide-text', getSlideTextColor(slide));
    if (slide.background?.mode === 'image' && slide.background?.imageUrl) {
      surface.style.backgroundImage = `url(${slide.background.imageUrl})`;
      const overlay = document.createElement('div');
      overlay.className = 'slide-overlay';
      surface.appendChild(overlay);
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
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'هذه الشريحة فارغة. أضف بلوك من تبويب البلوكات.';
      body.appendChild(empty);
    } else {
      slide.blocks.forEach(block => body.appendChild(renderBlock(block, slide)));
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
    case 'hero':
      return renderHeroBlock(block);
    case 'text':
      return renderTextBlock(block, slide);
    case 'checklist':
      return renderChecklistBlock(block, slide);
    case 'stat':
      return renderStatBlock(block, slide);
    case 'image-text':
      return renderImageTextBlock(block, slide);
    case 'cta':
      return renderCtaBlock(block, slide);
    default:
      return el('div', 'block card-box', `نوع بلوك غير مدعوم: ${block.type}`);
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
  wrap.innerHTML = `${title ? `<h3>${escapeHtml(title)}</h3>` : ''}`;
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
    case 'hero':
      return { eyebrow: 'عنوان صغير', title: 'عنوان رئيسي', highlightedText: 'نص مميز', subtitle: 'سطر توضيحي مختصر.' };
    case 'text':
      return { title: 'عنوان بلوك', paragraph: 'اكتب النص هنا.' };
    case 'checklist':
      return { title: 'عنوان قائمة', items: [{ text: 'نقطة أولى' }, { text: 'نقطة ثانية' }, { text: 'نقطة ثالثة' }] };
    case 'stat':
      return { title: 'رقم مهم', value: '70%', label: 'وصف مختصر للرقم', supportingText: 'تفصيل بسيط.' };
    case 'image-text':
      return { imageUrl: '', title: 'عنوان مع صورة', paragraph: 'اكتب الشرح هنا.', caption: 'ملاحظة صغيرة' };
    case 'cta':
      return { title: 'دعوة للإجراء', message: 'اكتب الرسالة التسويقية هنا.', buttonText: 'اتخذ إجراء', subtext: 'شرح أو توضيح إضافي' };
    default:
      return {};
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
  alert('تم الحفظ محليًا.');
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
}

function copyJson() {
  navigator.clipboard.writeText(serializeProject())
    .then(() => alert('تم نسخ JSON.'))
    .catch(() => alert('تعذر النسخ من المتصفح الحالي.'));
}

function importJson() {
  try {
    const parsed = JSON.parse(refs.jsonEditor.value);
    if (!parsed || !Array.isArray(parsed.slides)) {
      throw new Error('الصيغة غير صحيحة: slides مفقودة.');
    }
    state.project = parsed;
    state.selectedSlideId = state.project.slides[0]?.id || null;
    state.selectedBlockId = state.project.slides[0]?.blocks?.[0]?.id || null;
    touch();
    alert('تم استيراد المشروع بنجاح.');
  } catch (error) {
    alert(error.message || 'JSON غير صالح.');
  }
}

function resetDemo() {
  if (!confirm('إرجاع المشروع إلى نسخة الديمو؟')) return;
  state.project = structuredClone(demoProject);
  state.selectedSlideId = state.project.slides[0]?.id || null;
  state.selectedBlockId = state.project.slides[0]?.blocks?.[0]?.id || null;
  touch();
}

function setZoom(next) {
  state.zoom = Math.max(25, Math.min(80, next));
  render();
}

function touch() {
  state.project.meta = state.project.meta || {};
  state.project.meta.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, serializeProject());
  render();
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

function slugify(text) {
  return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-_\u0600-\u06FF]/g, '');
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
