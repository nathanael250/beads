const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://beads-bakend.zuselogic.com/api/v1'
const API_TOKEN = import.meta.env.VITE_API_TOKEN || ''
const API_ORIGIN = API_BASE_URL.replace(/\/api\/.*$/, '')

function getHeaders(hasBody = false) {
  const headers = hasBody ? { 'Content-Type': 'application/json' } : {}

  if (API_TOKEN) {
    headers.Authorization = `Bearer ${API_TOKEN}`
  }

  return headers
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getHeaders(Boolean(options.body)),
      ...options.headers,
    },
  })
  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.message || 'The backend request failed.')
  }

  return payload.data ?? payload
}

function slugify(value = '') {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function getCategoryKey(category) {
  const value = slugify(category?.slug || category?.key || category?.name || category?.category || '')

  if (value.includes('nail')) {
    return 'nails'
  }

  if (value.includes('skin')) {
    return 'skin-care'
  }

  return 'hair'
}

function normalizeList(data) {
  if (Array.isArray(data)) {
    return data
  }

  return data?.items || data?.rows || data?.results || data?.data || []
}

function resolveAssetUrl(value) {
  if (!value) {
    return ''
  }

  if (/^https?:\/\//i.test(value)) {
    return value
  }

  return `${API_ORIGIN}${value.startsWith('/') ? value : `/${value}`}`
}

export function formatDuration(minutes, fallback = '30 - 45 Min') {
  const value = Number(minutes)

  return Number.isFinite(value) && value > 0 ? `${value} Min` : fallback
}

export async function fetchServiceCategories() {
  return normalizeList(await request('/services/categories')).map((category) => ({
    ...category,
    key: getCategoryKey(category),
    label: category.name || category.label || 'Services',
  }))
}

export async function fetchServices() {
  const [categories, services] = await Promise.all([
    fetchServiceCategories().catch(() => []),
    request('/services').then(normalizeList),
  ])
  const categoryMap = new Map(categories.map((category) => [String(category.id), category]))

  return services.map((service) => {
    const category = categoryMap.get(String(service.category_id || service.categoryId)) || service.category || {}
    const categoryKey = getCategoryKey(category)
    const title = service.name || service.title || 'Service'

    return {
      backendId: service.id,
      id: slugify(title),
      category: categoryKey,
      categoryLabel: category.name || service.category_name || service.categoryLabel || 'Services',
      title,
      text: service.description || service.short_description || 'Professional care tailored to your needs',
      intro: service.description || 'Professional care tailored to your needs.',
      subtitle: 'Designed to help you look polished and feel confident.',
      duration: formatDuration(service.estimated_duration_minutes || service.duration_minutes),
      about: service.description || 'This service is tailored around your needs with careful attention to detail.',
      points: ['Personal consultation', 'Professional care', 'Clean finishing', 'Comfort-focused service'],
      image: resolveAssetUrl(service.image || service.image_url),
      price: service.price,
    }
  })
}

export async function fetchEmployees() {
  return normalizeList(await request('/employees/service-providers')).map((employee) => ({
    id: String(employee.id),
    publicId: employee.public_id,
    name: employee.name || [employee.first_name, employee.last_name].filter(Boolean).join(' ') || 'Professional',
    firstName: employee.first_name,
    lastName: employee.last_name,
    role: employee.employee_type?.name || employee.employee_type_name || employee.role || 'Beads Professional',
    image: resolveAssetUrl(employee.profile_image || employee.image),
    services: normalizeList(employee.services).map((service) => ({
      id: service.id,
      name: service.name,
      categoryId: service.category_id,
      categoryName: service.category_name,
    })),
  }))
}

export async function createAppointment({ name, phone, serviceId, professionalId, date, time }) {
  return request('/appointments', {
    method: 'POST',
    body: JSON.stringify({
      serviceId,
      professionalId: professionalId === 'any-professional' ? null : professionalId,
      customerName: name,
      customerPhone: phone,
      preferredDate: date,
      preferredTime: time,
      notes: 'Created from public website booking form.',
    }),
  })
}
