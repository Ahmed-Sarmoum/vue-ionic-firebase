<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-row class="ion-align-items-center">
            <ion-col>
              <ion-card-title>Balance:</ion-card-title>
            </ion-col>
            <ion-col class="ion-text-end">
              <ion-card-title>$ {{ totalBalance }}</ion-card-title>
            </ion-col>
          </ion-row>
        </ion-card-header>
      </ion-card>

      <ion-row>
        <ion-col>
          <ion-button  expand="block" @click="openFundsModel(false)">Add funds</ion-button>
        </ion-col>
        <ion-col>
          <ion-button color="danger" expand="block" @click="openFundsModel(true)">Reduce funds</ion-button>
        </ion-col>
      </ion-row>

      <ion-card>
        <ion-row
          v-for="(record, index) in recordsList" :key="index"
        >
          <ion-col>
            <ion-card-title>{{ record.comment }}</ion-card-title>
            <ion-card-subtitle>{{ record.date }}</ion-card-subtitle>
          </ion-col>
          <ion-col class="ion-text-end">
            <ion-card-title :class="{'added-funds': !record.isExpense}">
              <span v-if="!record.isExpense">+</span>
              $ {{ record.value }}
            </ion-card-title>
          </ion-col>
        </ion-row>
      </ion-card>

      <ion-modal 
        :is-open="isAddFundsModelOpen" 
        @will-dismiss="dismiss"
        :initial-breakpoint=".5"
        :breakpoints="[0, .5, 1]"  
        handle-behavior="cycle"
      >
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="dismiss">Cancel</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-input 
            v-model="record.comment"
            label="Comment"
            label-placement="floating"
          />
          <ion-input 
            v-model="record.value"
            label="Amount"
            class="ion-margin-bottom" 
            label-placement="floating"
          />
          <ion-button 
            expand="block" 
            class="ion-margin-top" 
            @click="addFunds"
          >
          Submit
        </ion-button>
        </ion-content>
    </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { userStore } from '@/store/user'

const store = userStore()

let recordsList = ref([])
const isNewRecordWithExpenses = ref(false)
const isAddFundsModelOpen = ref(false)
let record = reactive({
  comment: '',
  value: ''
})

const totalBalance = computed(() => {
  return recordsList.value.reduce((sum, el) => {
    if (el.isExpense) {
      return sum - Number(el.value)
    } else {
      return sum + Number(el.value)
    }
  }, 0)
})

const dismiss = () => {
  isAddFundsModelOpen.value = false
}
const openFundsModel = (isExpenses) => {
  isNewRecordWithExpenses.value = isExpenses
  isAddFundsModelOpen.value = true
}
const addFunds = () => {
  if(!record.comment || !record.value) return
  const data = {...record, date: new Date().toDateString(), isExpense: isNewRecordWithExpenses.value}  
  // recordsList.value.push(data)
  store.addRecorsToStore(data)
  dismiss()

  record = {
    comment: '',
    value: ''
  }
}


onMounted(() => {
  store.fetchDataFromDB()
  recordsList.value = store.records
})
</script>

<style scoped>
.added-funds {
  color: var(--ion-color-success);
}
</style>
