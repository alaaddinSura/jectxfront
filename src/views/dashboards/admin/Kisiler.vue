<script setup>
import AddNewUser from "@/views/dashboards/stats/AdminModal/AddNewUser.vue";
import { useUserListStore } from "@/views/apps/user/useUserListStore";
import { avatarText } from "@core/utils/formatters";
import * as fetchData from "@/views/dashboards/functions/fetchData";
import { useRouter } from "vue-router";
import Loader from "../functions/loader.vue";
import { store } from "@/store/index";
import AddUserModal from "@/views/dashboards/stats/AdminModal/AddUserModal.vue"
import EditUserModal from "@/views/dashboards/stats/AdminModal/EditUserModal.vue"
import DeleteUserModal from "@/views/dashboards/stats/AdminModal/DeleteUserModal.vue"
import * as demoCode from '@/views/demos/components/dialog/demoCodeDialog'

const router = useRouter();



const userListStore = useUserListStore();
const searchQuery = ref("");
const rowPerPage = ref(10);
const currentPage = ref(1);
const totalPage = ref(1);
const totalUsers = ref(0);
const users = ref([]);

let tableData = computed(() => {
  let channelData = store.state.userRole.length == 0 ? JSON.parse(localStorage.getItem("userRole")) : store.state.userRole;
  console.log("store state ==> ", store.state.userRole)

  return channelData;
});

console.log("table Data ==> ", tableData.value);



// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});

const isAddNewUserDrawerVisible = ref(false);

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});

const filteredUsers = computed(() => {
  return tableData.value.filter(user => {
    // If searchQuery is empty, show all users
    if (!searchQuery.value) return true;
    // If searchQuery is present, filter users based on email
    return user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

// Log filtered users to console
watchEffect(() => {
});
// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = tableData.value.length
    ? (currentPage.value - 1) * rowPerPage.value + 1
    : 0;
  const lastIndex =
    currentPage.value * rowPerPage.value > totalUsers.value
      ? totalUsers.value
      : currentPage.value * rowPerPage.value;

  return `Showing ${filteredUsers.value.length} to ${lastIndex} of ${totalUsers.value} entries`;
});

const addNewUser = (userData) => {
  userListStore.addUser(userData);

  // refetch User
  fetchUsers();
};

</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard title="Kişiler">
          <VDivider />

          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div
              class="app-user-search-filter d-flex align-center flex-wrap gap-4"
            >
              <!-- 👉 Search  -->
              <div style="width: 10rem">
                <VTextField
                  v-model="searchQuery"
                  placeholder="Search"
                  density="compact"
                />
              </div>
              <VSpacer />
              <!-- 👉 Add user button -->
              <!-- <VIcon
                :icon="'tabler-circle-plus'"
                size="34"
                :color="'success'"
                class="me-1"
                @click="isAddNewUserDrawerVisible = true"
              /> -->
              <AddUserModal />
            </div>
          </VCardText>
          <VDivider />

          <VTable
            class="text-no-wrap"
            v-if="store.state.userRoleLoader == 1"
          >
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col">EMAİL</th>
                <th scope="col">SİL</th>
                <th scope="col">EDİT</th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                style="height: 3.75rem"
              >
                <!-- 👉 User -->
                <td>
                  <div class="d-flex align-center">
                    <VAvatar
                      variant="tonal"
                      :icon="'tabler-user'"
                      :color="'success'"
                      class="me-3"
                      size="38"
                    >
                      <span>{{ avatarText(user.fullName) }}</span>
                    </VAvatar>

                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        {{ user.email }}
                      </h6>
                      <span class="text-sm text-disabled"></span>
                    </div>
                  </div>
                </td>

                <!-- 👉 Delete -->
                <td>
                  <DeleteUserModal :email="user.email"/>
                </td>

                <!-- 👉 Actions -->
                <td class="text-center">
                    <EditUserModal :email="user.email" />
                </td>
              </tr>
            </tbody>
          </VTable>

          <VTable v-if="store.state.userRoleLoader == 0">
            <Loader
              style="
                width: 100px;
                height: 100px;
                margin-left: auto;
                margin-right: auto;
                margin-top: 20px;
                margin-bottom: 20px;
              "
            />
          </VTable>

          <VDivider />

          <VCardText
            class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5"
          >
            <span class="text-sm text-disabled">
              {{ paginationData }}
            </span>

            <VPagination
              v-model="currentPage"
              size="small"
              :total-visible="5"
              :length="totalPage"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Add New User -->
    <AddNewUser
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
