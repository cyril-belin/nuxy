<template>
  <div class="space-y-8 animate-fade-in text-gray-200">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-white tracking-tight">Mes Projets</h1>
        <p class="text-gray-500 font-medium">Gérez et suivez l'avancement de vos travaux.</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3">
          <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 text-gray-500" />
          <input v-model="search" type="text" placeholder="Rechercher un projet..." class="bg-transparent border-none focus:ring-0 text-sm font-medium text-white placeholder-gray-500 w-48" />
        </div>
        <UButton color="indigo" icon="i-heroicons-plus" class="rounded-xl font-black shadow-lg shadow-indigo-500/20" @click="isModalOpen = true">
          Nouveau Projet
        </UButton>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="h-48 bg-white/5 border border-white/10 rounded-3xl animate-pulse"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!projects || projects.length === 0" class="bg-white/5 border border-white/10 rounded-3xl p-20 text-center">
      <div class="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <UIcon name="i-heroicons-folder-open" class="w-10 h-10 text-indigo-400" />
      </div>
      <h3 class="text-xl font-black text-white mb-2">Aucun projet trouvé</h3>
      <p class="text-gray-500 font-medium mb-8">Commencez par créer votre premier projet pour voir les statistiques.</p>
      <UButton color="indigo" variant="outline" class="rounded-xl font-black border-indigo-500/30" @click="isModalOpen = true">
        Créer un projet
      </UButton>
    </div>

    <!-- Projects Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in filteredProjects" :key="project.id" 
        class="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all hover:border-indigo-500/30 group relative overflow-hidden">
        
        <div class="flex items-start justify-between mb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UIcon name="i-heroicons-folder-solid" class="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 class="text-lg font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">{{ project.name }}</h3>
              <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Créé le {{ project.createdAt }}</p>
            </div>
          </div>
          <UDropdown :items="projectActions(project)" :ui="{ rounded: 'rounded-xl', shadow: 'shadow-2xl', ring: 'ring-1 ring-white/10', background: 'bg-gray-950' }">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-vertical" class="rounded-lg hover:bg-white/10" />
          </UDropdown>
        </div>

        <!-- Progress Section -->
        <div class="space-y-3 mb-6">
          <div class="flex justify-between text-xs font-black uppercase tracking-widest">
            <span class="text-gray-500">Progression</span>
            <span class="text-white">{{ project.progress }}%</span>
          </div>
          <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div class="h-full bg-indigo-500 rounded-full transition-all duration-1000" :style="{ width: `${project.progress}%` }"></div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="flex items-center justify-between pt-6 border-t border-white/5">
          <div class="flex -space-x-2">
            <UAvatar v-for="i in Math.min(project.members || 1, 3)" :key="i" size="xs" 
              :src="`https://i.pravatar.cc/150?u=${project.id + i}`"
              class="ring-2 ring-gray-950" 
            />
            <div v-if="(project.members || 1) > 3" class="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-black text-white ring-2 ring-gray-950">
              +{{ (project.members || 1) - 3 }}
            </div>
          </div>
          <UBadge :color="statusColor(project.status)" variant="subtle" class="rounded-full px-3 py-0.5 font-bold text-[10px] uppercase tracking-widest">
            {{ project.status }}
          </UBadge>
        </div>

        <!-- Background Decor -->
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
      </div>
    </div>

    <!-- Create Project Modal -->
    <UModal v-model="isModalOpen" :ui="{ rounded: 'rounded-3xl', background: 'bg-gray-950 border border-white/10' }">
      <div class="p-8 bg-gray-950 border border-white/10 rounded-3xl">
        <h3 class="text-2xl font-black text-white mb-2">Nouveau Projet</h3>
        <p class="text-gray-500 font-medium mb-8">Donnez un nom et une ambition à votre prochain succès.</p>
        
        <form @submit.prevent="createProject" class="space-y-6">
          <UFormGroup label="Nom du projet" name="name" :ui="{ label: { base: 'text-gray-300 font-bold mb-2' } }">
            <UInput v-model="newProjectName" placeholder="ex: Application Mobile X" size="xl"
              icon="i-heroicons-sparkles"
              color="white"
              variant="outline"
              class="rounded-xl"
              :ui="{ 
                base: 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-indigo-500',
                rounded: 'rounded-xl'
              }"
            />
          </UFormGroup>

          <UFormGroup label="Description (optionnel)" name="description" :ui="{ label: { base: 'text-gray-300 font-bold mb-2' } }">
            <UTextarea v-model="newProjectDesc" placeholder="Décrivez brièvement le but du projet..." 
              class="bg-white/5 border-white/10 text-white rounded-xl focus:ring-indigo-500"
              :rows="3"
            />
          </UFormGroup>

          <div class="flex gap-4 pt-4">
            <UButton color="gray" variant="ghost" class="flex-1 rounded-xl font-bold justify-center" @click="isModalOpen = false">
              Annuler
            </UButton>
            <UButton type="submit" color="indigo" :loading="creating" class="flex-1 rounded-xl font-black justify-center shadow-lg shadow-indigo-500/20">
              Créer le projet
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
const newProjectName = ref('')
const newProjectDesc = ref('')
const creating = ref(false)
const toast = useToast()

const { projects: api } = useApi()

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

interface Project {
  id: number
  name: string
  status: string
  progress: number
  members: number
  createdAt: string
}

// Fetching projects using Nuxt native standard
const { data: projects, pending, refresh } = useFetch<Project[]>('/api/projects')

onMounted(() => {
  console.log('Projects Page Mounted. Initial Data:', projects.value)
})

const filteredProjects = computed(() => {
  if (!projects.value || !Array.isArray(projects.value)) return []
  return projects.value.filter((p: Project) => p.name.toLowerCase().includes(search.value.toLowerCase()))
})

function statusColor(status: string) {
  switch (status) {
    case 'Terminé': return 'emerald'
    case 'En cours': return 'indigo'
    case 'En attente': return 'amber'
    default: return 'gray'
  }
}

function projectActions(project: Project) {
  return [
    [
      { label: 'Détails', icon: 'i-heroicons-eye', click: () => toast.add({ title: 'Info', description: 'Détails bientôt disponibles' }) }, 
      { label: 'Éditer', icon: 'i-heroicons-pencil-square', click: () => editProject(project) }
    ],
    [
      { label: 'Archiver', icon: 'i-heroicons-archive-box', click: () => archiveProject(project.id) }, 
      { label: 'Supprimer', icon: 'i-heroicons-trash', color: 'red', click: () => deleteProject(project.id) }
    ]
  ]
}

async function editProject(project: Project) {
  // Simple edit simulation - in a real app this would open a modal
  const newName = prompt('Nouveau nom du projet', project.name)
  if (!newName || newName === project.name) return
  
  try {
    await api.update(project.id, { name: newName })
    toast.add({ title: 'Mis à jour', description: 'Le projet a été renommé', color: 'emerald' })
    await refresh()
  } catch (err) {
    toast.add({ title: 'Erreur', description: 'Échec de la mise à jour', color: 'red' })
  }
}

async function archiveProject(id: number) {
  try {
    await api.archive(id)
    toast.add({ title: 'Archivé', description: 'Le projet a été déplacé aux archives', color: 'amber' })
    await refresh()
  } catch (err) {
    toast.add({ title: 'Erreur', description: 'Échec de l\'archivage', color: 'red' })
  }
}

async function deleteProject(id: number) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return
  
  try {
    await api.delete(id)
    toast.add({ title: 'Supprimé', description: 'Le projet a été supprimé definitivement', color: 'emerald' })
    await refresh()
  } catch (err) {
    toast.add({ title: 'Erreur', description: 'Échec de la suppression', color: 'red' })
  }
}

async function createProject() {
  if (!newProjectName.value) return
  
  creating.value = true
  try {
    await api.create({ name: newProjectName.value, description: newProjectDesc.value })
    
    toast.add({ title: 'Succès', description: 'Projet créé avec succès', color: 'green' })
    isModalOpen.value = false
    newProjectName.value = ''
    newProjectDesc.value = ''
    await refresh()
  } catch (err: any) {
    console.error('Create Project Error:', err)
    toast.add({ title: 'Erreur', description: 'Échec de la création', color: 'red' })
  } finally {
    creating.value = false
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
</style>
