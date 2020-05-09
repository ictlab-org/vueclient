<template>
  <v-container>
    <v-snackbar v-model="snack" :timeout="3000" top :color="snackColor" class="text-capitalize">
      {{ snackText }}
      <v-btn @click="snack = false" outline>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-toolbar flat color="white" class="elevation-1">
      <v-toolbar-title>Report</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Report</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-form wrap ref="reportForm" v-model="valid">
                <v-text-field v-model="editedReport.Temperature     " label="Temperature     " ></v-text-field>
                <v-switch v-model="editedReport.Cough           " label="Cough           " ></v-switch>
                <v-switch v-model="editedReport.RunningNose     " label="RunningNose     " ></v-switch>
                <v-switch v-model="editedReport.SoreThroat      " label="SoreThroat      " ></v-switch>
                <v-switch v-model="editedReport.DifficultBreath " label="DifficultBreath " ></v-switch>
                <v-switch v-model="editedReport.Headache        " label="Headache        " ></v-switch>
                <v-switch v-model="editedReport.Diarrhea        " label="Diarrhea        " ></v-switch>
                <v-switch v-model="editedReport.Nausea          " label="Nausea          " ></v-switch>
                <v-switch v-model="editedReport.VitA            " label="VitA            " ></v-switch>
                <v-switch v-model="editedReport.VitE            " label="VitE            " ></v-switch>
                <v-switch v-model="editedReport.VitD            " label="VitD            " ></v-switch>
                <v-switch v-model="editedReport.VitC            " label="VitC            " ></v-switch>
                <v-switch v-model="editedReport.Sunbathe        " label="Sunbathe        " ></v-switch>
                <v-switch v-model="editedReport.Exercise        " label="Exercise        " ></v-switch>
                <v-switch v-model="editedReport.Veg             " label="Veg             " ></v-switch>
                <v-switch v-model="editedReport.Fruit           " label="Fruit           " ></v-switch>
                <v-switch v-model="editedReport.SleepEarly      " label="SleepEarly      " ></v-switch>
                <v-switch v-model="editedReport.Mask            " label="Mask            " ></v-switch>
                <v-switch v-model="editedReport.Handwash        " label="Handwash        " ></v-switch>
                <v-text-field v-model="editedReport.Complaint       " label="Complaint       " ></v-text-field>
                <v-text-field v-model="editedReport.Medicine        " label="Medicine        " ></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close">Cancel</v-btn>
            <v-btn color="primary" @click="save" :disabled="!valid">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table
            :headers="headers"
            :items="reports"
            :pagination.sync="pagination"
            :total-items="totalReport"
            :loading="loading"
            class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td @click="props.expanded = !props.expanded">{{ props.item.Id }}</td>
          <td @click="props.expanded = !props.expanded">{{ props.item.AccountID }}</td>
          <td @click="props.expanded = !props.expanded">{{ props.item.Temperature }}</td>
          <td @click="props.expanded = !props.expanded">{{ props.item.Complaint }}</td>
          <td @click="props.expanded = !props.expanded">{{ props.item.Medicine  }}</td>
          <td @click="props.expanded = !props.expanded">{{ props.item.UpdatedAt | formatDate }}</td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>Cough           : {{ props.item.Cough          }}</v-card-text>
          <v-card-text>RunningNose     : {{ props.item.RunningNose    }}</v-card-text>
          <v-card-text>SoreThroat      : {{ props.item.SoreThroat     }}</v-card-text>
          <v-card-text>DifficultBreath : {{ props.item.DifficultBreath}}</v-card-text>
          <v-card-text>Headache        : {{ props.item.Headache       }}</v-card-text>
          <v-card-text>Diarrhea        : {{ props.item.Diarrhea       }}</v-card-text>
          <v-card-text>Nausea          : {{ props.item.Nausea         }}</v-card-text>
          <v-card-text>VitA            : {{ props.item.VitA           }}</v-card-text>
          <v-card-text>VitE            : {{ props.item.VitE           }}</v-card-text>
          <v-card-text>VitD            : {{ props.item.VitD           }}</v-card-text>
          <v-card-text>VitC            : {{ props.item.VitC           }}</v-card-text>
          <v-card-text>Sunbathe        : {{ props.item.Sunbathe       }}</v-card-text>
          <v-card-text>Exercise        : {{ props.item.Exercise       }}</v-card-text>
          <v-card-text>Veg             : {{ props.item.Veg            }}</v-card-text>
          <v-card-text>Fruit           : {{ props.item.Fruit          }}</v-card-text>
          <v-card-text>SleepEarly      : {{ props.item.SleepEarly     }}</v-card-text>
          <v-card-text>Mask            : {{ props.item.Mask           }}</v-card-text>
          <v-card-text>Handwash        : {{ props.item.Handwash       }}</v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { ReportService } from '@/services/report.service'

export default {
  name: 'reports',
  data() {
    return {
      reports: [],
      totalReport: 0,
      loading: true,
      pagination: {},
      headers: [
        { text: 'Id', value: 'Id', sortable: false },
        { text: 'AccountID', align: 'left', value: 'AccountID' },
        { text: 'Temperature', align: 'left', value: 'Temperature' },
        { text: 'Complaint', align: 'left', value: 'Complaint' },
        { text: 'Medicine', align: 'left', value: 'Medicine' },
        { text: 'UpdatedAt', align: 'left', value: 'UpdatedAt' }
      ],
      dialog: false,
      editedIndex: -1,
      editedReport: {
        Temperature: 35,
        Cough: false,
        RunningNose: false,
        SoreThroat: false,
        DifficultBreath: false,
        Headache: false,
        Diarrhea: false,
        Nausea: false,
        VitA: false,
        VitE: false,
        VitD: false,
        VitC: false,
        Sunbathe: false,
        Exercise: false,
        Veg: false,
        Fruit: false,
        SleepEarly: false,
        Mask: false,
        Handwash: false,
        Complaint: '',
        Medicine: ''
      },
      valid: true,
      errors: {},
      snack: false,
      snackColor: '',
      snackText: '',
      temperatureRules: [
        v => !!v || 'Temperature is required',
        v => (v && v.length <= 100) || 'Name must be less than 100 characters',
        () => !this.errors.name || this.errors.name
      ]
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    pagination: {
      async handler() {
        const data = await this.getReport()
        this.reports = data.reports
        this.totalReport = data.count
      },
      depp: true
      // immediate: true
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Report' : 'Edit Report'
    }
  },
  methods: {
    async getReport() {
      this.loading = true
      try {
        const { sortBy, descending, page, rowsPerPage } = this.pagination
        const filter = {
          page: page,
          limit: rowsPerPage === -1 ? 0 : rowsPerPage,
          order: (sortBy ? sortBy : '') + (descending ? ' desc' : '')
        }

        let { reports: reports, count } = await ReportService.getReport(filter)
        return { reports: reports, count }
      } catch (error) {
        console.log('could not get report data', error)
      } finally {
        this.loading = false
      }
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedReport = Object.assign({}, this.defaultReport)
        this.editedIndex = -1
        this.$refs.reportForm.reset()
      }, 250)
    },

    async save() {
      try {
        const reports = await ReportService.createReport(
          Object.assign({}, this.editedReport)
        )
        this.reports.push(reports)
        this.close()
        this.snackSuccess('report created')
      } catch (error) {
        this.errors = { ...error.fields }
        this.$refs.reportForm.validate()
        this.snackError(error.message)
      }
    },

    async deleteReport(report) {
      if (
        await this.$root.$confirm('Delete', 'Are you sure?', {
          color: 'warning'
        })
      ) {
        try {
          const index = this.reports.indexOf(report)
          const id = this.reports[index].id
          await ReportService.deleteReport(id)
          this.reports = this.reports.filter(v => v.id !== id)
          this.totalReport--
          this.snackSuccess('report deleted')
        } catch (error) {
          this.snackError('could not delete report')
        }
      }
    },

    snackSuccess(message) {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = message
    },
    snackError(message) {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = message
    }
  }
}
</script>

<style lang="stylus" scoped>
  .columnIcon {
    width: 5rem;
  }
</style>
