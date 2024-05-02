<script setup>
import AddNewUser from "@/views/dashboards/stats/AdminModal/AddNewUser.vue";
import { useUserListStore } from "@/views/apps/user/useUserListStore";
import { avatarText } from "@core/utils/formatters";
import * as fetchData from "@/views/dashboards/functions/fetchData";
import { useRouter } from "vue-router";
import Loader from "@/views/dashboards/functions/loader.vue";
import { store } from "@/store/index";
import AddGoalsModal from "@/views/admin/stats/Goals/AddGoalsModal.vue"
import EditGoalsModal from "@/views/admin/stats/Goals/EditGoalsModal.vue"
import DeleteModal from "@/views/admin/stats/Goals/DeleteModal.vue"


const userListStore = useUserListStore();
const searchQuery = ref("");
const rowPerPage = ref(10);
const currentPage = ref(1);
const totalPage = ref(1);
const totalUsers = ref(0);

let tableData = computed(() => {
  let channelData = store.state.getGoals.length == 0 ? JSON.parse(localStorage.getItem("getGoals")) : store.state.getGoals
  return channelData;
});


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
    return user.date.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * rowPerPage.value;
  const endIndex = startIndex + rowPerPage.value;
  return filteredUsers.value.slice(startIndex, endIndex);
});

watchEffect(() => {
  totalUsers.value = filteredUsers.value.length;
  totalPage.value = Math.ceil(totalUsers.value / rowPerPage.value);
});

watch(rowPerPage, () => {
  totalPage.value = Math.ceil(totalUsers.value / rowPerPage.value);
  if (currentPage.value > totalPage.value) {
    currentPage.value = totalPage.value;
  }
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
        <VCard>

          <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4">
            <!-- 👉 Metin -->
            <span class="text-h6">Aylık Hedefler</span>
          

           <div class="d-flex gap-4">
            <div style="width: 5rem;">
              <VSelect
                v-model="rowPerPage"
                variant="outlined"
                :items="[7, 10, 20, 30, 50]"
              />
            </div>
            <AddGoalsModal />
            <!-- 👉 Search  -->
            <div style="width: 10rem">
              <VTextField
                v-model="searchQuery"
                placeholder="Search"
                density="compact"
              />
           </div>
            </div>
          </VCardText>
          <VDivider />

          <VTable
            class="text-no-wrap"
            v-if="store.state.goalsLoader == 1"
          >
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col">OTEL</th>
                <th scope="col">AY</th>
                <th scope="col">HEDEF</th>
                <th scope="col">SİL</th>
                <th scope="col">EDİT</th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr
                v-for="user in paginatedUsers"
                :key="user._id"
                style="height: 3.75rem"
              >
                <!-- 👉 User -->
                <td>
                  <div class="d-flex align-center">
                    <VAvatar
                      variant="tonal"
                      :icon="user.hotelId != '22964' ? 'tabler-building' : 'tabler-building-skyscraper'"
                      :color="user.hotelId != '22964' ? 'warning': 'success'"
                      class="me-3"
                      size="38"
                    >
                      <span>{{ avatarText(user.fullName) }}</span>
                    </VAvatar>

                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        {{ user.hotelId != "22964" ?  "DESİGN" : "AYASOFYA" }}
                      </h6>
                      <span class="text-sm text-disabled"></span>
                    </div>
                  </div>
                </td>

                <td>
                  <div class="d-flex flex-column">
                    <h6 class="text-base">
                      {{ user.date }}
                    </h6>
                    <span class="text-sm text-disabled"></span>
                  </div>
                </td>

                <td>
                  <div class="d-flex flex-column">
                    <h6 class="text-base">
                      {{ user.value }}
                    </h6>
                    <span class="text-sm text-disabled"></span>
                  </div>
                </td>
                <!-- 👉 Delete -->
                <td>
                  <DeleteModal :delete="user._id"/> 
                </td>

                <!-- 👉 Actions -->
                <td>
                    <EditGoalsModal :id="user._id" :hotels="user.hotelId" :date="user.date" :target="user.value"/>
                </td>
              </tr>
            </tbody>
          </VTable>

          <VTable v-if="store.state.goalsLoader == 0">
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
