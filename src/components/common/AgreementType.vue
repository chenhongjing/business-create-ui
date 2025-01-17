<template>
  <div id="agreement-summary">
    <!-- SUMMARY SECTION -->
    <template v-if="isSummary">
      <!-- Summary Warning -->
      <section v-if="showErrorSummary && getShowErrors" class="agreement-invalid-message invalid-section">
        <span>
          <v-icon color="error">mdi-information-outline</v-icon>
          <span class="error-text mx-1">This step is unfinished.</span>
          <router-link
            id="router-link"
            :to="{ path: `/${RouteNames.INCORPORATION_AGREEMENT}` }"
          >Return to this step to finish it</router-link>
        </span>
      </section>

      <!-- Summary Content -->
      <div v-else class="summary-desc">
        <v-icon color="green darken-2" class="agreement-valid-icon">mdi-check</v-icon>
        <div v-html="agreementTypeDescription"></div>
      </div>
    </template>

    <!-- EDIT SECTION -->
    <template v-if="!isSummary">
      <div v-if="isTypeBcUlcCompany || isTypeBcCcc" :class="{ 'invalid-section': showErrorSummary && getShowErrors }">
        <v-checkbox
          v-for="(item, index) in getIncorporationAgreementDocuments"
          v-model="agreementType"
          class="ml-6 mt-0 agreement-option-list"
          :id="`agreement-type-${item.code}`"
          :key="index"
          :value="item.code"
          @change="changeAgreementType()"
        >
          <template v-slot:label>
            <div v-html="item.description" class="ml-6 py-4 agreement-option" />
          </template>
        </v-checkbox>
      </div>

      <div class="py-8 px-6" v-else :class="{ 'invalid-section': showErrorSummary && getShowErrors }">
        <v-radio-group
          class="mt-0 pt-0"
          hide-details
          v-model="agreementType"
          @change="changeAgreementType()"
        >
          <v-radio
            v-for="(item, index) in getIncorporationAgreementDocuments"
            :key="index"
            :value="item.code"
            :id="`agreement-type-${item.code}`"
          >
            <template v-slot:label>
              <div v-html="item.description" class="agreement-option ml-6" />
            </template>
          </v-radio>
        </v-radio-group>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'pinia-class'
import { useStore } from '@/store/store'
import { ActionBindingIF, IncorporationAgreementIF, IncorporationAgreementTypeIF } from '@/interfaces'
import { RouteNames } from '@/enums'

@Component({})
export default class AgreementType extends Vue {
  @Prop({ default: false }) readonly showErrorSummary!: boolean
  @Prop({ default: false }) readonly isSummary!: boolean

  @Getter(useStore) getIncorporationAgreementDocuments!: Array<IncorporationAgreementTypeIF>
  @Getter(useStore) getIncorporationAgreementStep!: IncorporationAgreementIF
  @Getter(useStore) getShowErrors!: boolean
  @Getter(useStore) isTypeBcCcc!: boolean
  @Getter(useStore) isTypeBcUlcCompany!: boolean

  @Action(useStore) setIncorporationAgreementStepData!: ActionBindingIF

  agreementType = null as string

  // Enum for template
  readonly RouteNames = RouteNames

  /** The agreement type description. */
  get agreementTypeDescription (): string {
    return this.getIncorporationAgreementDocuments
      .find(x => x.code === this.getIncorporationAgreementStep.agreementType)?.description
  }

  /** Called when component is created. */
  created (): void {
    this.agreementType = this.getIncorporationAgreementStep.agreementType
  }

  /** Called when component is mounted. */
  mounted (): void {
    this.setIncorporationAgreementStepData({
      valid: !!this.agreementType,
      agreementType: this.agreementType
    })
  }

  changeAgreementType (): void {
    this.setIncorporationAgreementStepData({
      valid: !!this.agreementType,
      agreementType: this.agreementType
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

.agreement-invalid-message {
  padding: 1.25rem;
  color: $app-red;
}

.summary-desc {
  padding: 1rem;
  font-size: $px-14;
  display: flex;
  justify-content: center;
}

.agreement-valid-icon {
  padding-right: 0.5rem;
}

.agreement-option {
  color: $gray7;
}

.v-radio:not(:first-of-type) {
  margin-top: 1rem;
}

.v-icon.mdi-information-outline {
  margin-top: -2px;
}
</style>
