<template>
  <div class="space-y-8 animate-fade-in text-gray-200">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-white tracking-tight">Mon Équipe</h1>
        <p class="text-gray-500 font-medium">Gérez les membres, les rôles et les permissions.</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3">
          <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 text-gray-500" />
          <input v-model="search" type="text" placeholder="Rechercher un membre..." class="bg-transparent border-none focus:ring-0 text-sm font-medium text-white placeholder-gray-500 w-48" />
        </div>
        <UButton color="indigo" icon="i-heroicons-user-plus" class="rounded-xl font-black shadow-lg shadow-indigo-500/20" @click="isModalOpen = true">
          Inviter
        </UButton>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="stat in teamStats" :key="stat.label" class="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
        <div :class="`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`">
          <UIcon :name="stat.icon" :class="`w-5 h-5 ${stat.color}`" />
        </div>
        <div>
          <div class="text-xl font-black text-white tracking-tight">{{ stat.value }}</div>
          <div class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- Department Filter -->
    <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button v-for="dept in departments" :key="dept"
        :class="[
          'px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap',
          activeDepartment === dept 
            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
            : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
        ]"
        @click="activeDepartment = dept"
      >
        {{ dept }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="h-56 bg-white/5 border border-white/10 rounded-3xl animate-pulse"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!members || members.length === 0" class="bg-white/5 border border-white/10 rounded-3xl p-20 text-center">
      <div class="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <UIcon name="i-heroicons-users" class="w-10 h-10 text-indigo-400" />
      </div>
      <h3 class="text-xl font-black text-white mb-2">Aucun membre</h3>
      <p class="text-gray-500 font-medium mb-8">Invitez votre premier collaborateur pour commencer.</p>
      <UButton color="indigo" variant="outline" class="rounded-xl font-black border-indigo-500/30" @click="isModalOpen = true">
        Inviter un membre
      </UButton>
    </div>

    <!-- Members Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="member in filteredMembers" :key="member.id"
        class="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all hover:border-indigo-500/30 group relative overflow-hidden"
      >
        <!-- Member Header -->
        <div class="flex items-start justify-between mb-5">
          <div class="flex items-center gap-4">
            <div class="relative">
              <UAvatar :src="member.avatar" :alt="member.name" size="lg" class="ring-2 ring-white/10 group-hover:ring-indigo-500/30 transition-all" />
              <div :class="[
                'absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-gray-950',
                statusDot(member.status)
              ]"></div>
            </div>
            <div>
              <h3 class="text-base font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">{{ member.name }}</h3>
              <p class="text-xs text-gray-500 font-bold">{{ member.email }}</p>
            </div>
          </div>
          <UDropdown :items="memberActions(member)" :ui="{ rounded: 'rounded-xl', text: 'font-bold' }">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-vertical" class="rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </UDropdown>
        </div>

        <!-- Role & Department -->
        <div class="flex flex-wrap items-center gap-2 mb-5">
          <UBadge color="indigo" variant="subtle" class="rounded-full px-3 py-0.5 font-bold text-[10px] uppercase tracking-widest">
            {{ member.role }}
          </UBadge>
          <UBadge color="gray" variant="subtle" class="rounded-full px-3 py-0.5 font-bold text-[10px] uppercase tracking-widest">
            {{ member.department }}
          </UBadge>
        </div>

        <!-- Member Meta -->
        <div class="flex items-center justify-between pt-5 border-t border-white/5">
          <div class="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <UIcon name="i-heroicons-folder" class="w-3.5 h-3.5" />
            {{ member.projectsCount }} projet{{ member.projectsCount > 1 ? 's' : '' }}
          </div>
          <div class="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <UIcon name="i-heroicons-calendar" class="w-3.5 h-3.5" />
            {{ formatDate(member.joinedAt) }}
          </div>
        </div>

        <!-- Background Decor -->
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
      </div>
    </div>

    <!-- Invite Member Modal -->
    <UModal v-model="isModalOpen" :ui="{ rounded: 'rounded-3xl', background: 'bg-gray-950 border border-white/10' }">
      <div class="p-8 bg-gray-950 border border-white/10 rounded-3xl">
        <h3 class="text-2xl font-black text-white mb-2">Inviter un membre</h3>
        <p class="text-gray-500 font-medium mb-8">Ajoutez un collaborateur à votre équipe.</p>
        
        <form @submit.prevent="inviteMember" class="space-y-6">
          <UFormGroup label="Nom complet" name="name" :ui="{ label: { base: 'text-gray-300 font-bold mb-2' } }">
            <UInput v-model="newMember.name" placeholder="ex: Marie Curie" size="xl"
              icon="i-heroicons-user"
              color="white"
              variant="outline"
              class="rounded-xl"
              :ui="{ 
                base: 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-indigo-500',
                rounded: 'rounded-xl'
              }"
            />
          </UFormGroup>

          <UFormGroup label="Email" name="email" :ui="{ label: { base: 'text-gray-300 font-bold mb-2' } }">
            <UInput v-model="newMember.email" placeholder="marie@nuxy.dev" size="xl"
              icon="i-heroicons-envelope"
              color="white"
              variant="outline"
              type="email"
              class="rounded-xl"
              :ui="{ 
                base: 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-indigo-500',
                rounded: 'rounded-xl'
              }"
            />
          </UFormGroup>

          <UFormGroup label="Rôle" name="role" :ui="{ label: { base: 'text-gray-300 font-bold mb-2' } }">
            <USelectMenu v-model="newMember.role" :options="roleOptions" placeholder="Sélectionner un rôle"
              class="rounded-xl"
              :ui="{ trigger: 'bg-white/5 border-white/10 text-white rounded-xl font-bold' }"
            />
          </UFormGroup>

          <UFormGroup label="Département" name="department" :ui="{ label: { base: 'text-gray-300 font-bold mb-2' } }">
            <USelectMenu v-model="newMember.department" :options="departmentOptions" placeholder="Sélectionner un département"
              class="rounded-xl"
              :ui="{ trigger: 'bg-white/5 border-white/10 text-white rounded-xl font-bold' }"
            />
          </UFormGroup>

          <div class="flex gap-4 pt-4">
            <UButton color="gray" variant="ghost" class="flex-1 rounded-xl font-bold justify-center" @click="isModalOpen = false">
              Annuler
            </UButton>
            <UButton type="submit" color="indigo" :loading="inviting" class="flex-1 rounded-xl font-black justify-center shadow-lg shadow-indigo-500/20">
              Envoyer l'invitation
            </UButton>
          </div>
        </form>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const search = ref('')
const isModalOpen = ref(false)
const inviting = ref(false)
const activeDepartment = ref('Tous')
const toast = useToast()

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

interface TeamMember {
  id: number
  name: string
  email: string
  role: string
  status: 'Actif' | 'Absent' | 'Occupé'
  avatar: string
  department: string
  joinedAt: string
  projectsCount: number
}

const newMember = reactive({
  name: '',
  email: '',
  role: '',
  department: ''
})

const roleOptions = ['Lead Developer', 'Frontend Developer', 'Backend Developer', 'Designer UI/UX', 'Product Manager', 'DevOps Engineer', 'QA Engineer', 'Stagiaire']
const departmentOptions = ['Engineering', 'Design', 'Produit', 'Marketing', 'Général']

const { data: members, pending, refresh } = useFetch<TeamMember[]>('/api/team')

const departments = computed(() => {
  if (!members.value) return ['Tous']
  const depts = [...new Set(members.value.map((m: TeamMember) => m.department))]
  return ['Tous', ...depts]
})

const teamStats = computed(() => {
  const total = members.value?.length || 0
  const active = members.value?.filter((m: TeamMember) => m.status === 'Actif').length || 0
  const busy = members.value?.filter((m: TeamMember) => m.status === 'Occupé').length || 0
  const depts = members.value ? new Set(members.value.map((m: TeamMember) => m.department)).size : 0

  return [
    { label: 'Total membres', value: total, icon: 'i-heroicons-users', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'En ligne', value: active, icon: 'i-heroicons-signal', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Occupés', value: busy, icon: 'i-heroicons-clock', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Départements', value: depts, icon: 'i-heroicons-building-office-2', color: 'text-purple-400', bg: 'bg-purple-500/10' }
  ]
})

const filteredMembers = computed(() => {
  if (!members.value || !Array.isArray(members.value)) return []
  
  let filtered = members.value

  if (activeDepartment.value !== 'Tous') {
    filtered = filtered.filter((m: TeamMember) => m.department === activeDepartment.value)
  }

  if (search.value) {
    const q = search.value.toLowerCase()
    filtered = filtered.filter((m: TeamMember) =>
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q)
    )
  }

  return filtered
})

function statusDot(status: string) {
  switch (status) {
    case 'Actif': return 'bg-emerald-400'
    case 'Occupé': return 'bg-amber-400'
    case 'Absent': return 'bg-gray-500'
    default: return 'bg-gray-500'
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
}

function memberActions(member: TeamMember) {
  return [
    [
      { label: 'Voir le profil', icon: 'i-heroicons-eye' },
      { label: 'Modifier le rôle', icon: 'i-heroicons-pencil-square' },
      { label: 'Envoyer un message', icon: 'i-heroicons-chat-bubble-left-ellipsis' }
    ],
    [
      { label: 'Désactiver', icon: 'i-heroicons-no-symbol' },
      { label: 'Retirer', icon: 'i-heroicons-trash', color: 'red' as const }
    ]
  ]
}

async function inviteMember() {
  if (!newMember.name || !newMember.email || !newMember.role) return

  inviting.value = true
  try {
    await $fetch('/api/team', {
      method: 'POST',
      body: { ...newMember }
    })

    toast.add({ title: 'Invitation envoyée', description: `${newMember.name} a été invité(e) à rejoindre l'équipe.`, color: 'green' })
    isModalOpen.value = false
    Object.assign(newMember, { name: '', email: '', role: '', department: '' })
    await refresh()
  } catch (err: any) {
    console.error('Invite Error:', err)
    toast.add({ title: 'Erreur', description: 'Échec de l\'invitation', color: 'red' })
  } finally {
    inviting.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
