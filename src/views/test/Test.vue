<template>
  <mu-container>
    <mu-row gutter>
      <mu-col span="12" sm="6">
        <mu-select label="队友偏爱" multiple chips v-model="custom.value2" full-width>
          <template slot="selection" slot-scope="scope">
            <mu-chip :selected="scope.selected" color="teal" small>
              {{scope.label}}
            </mu-chip>
          </template>
          <mu-option v-for="(language,index) in languages" :key="index" :label="language" :value="language" style="border-radius:.5rem;"></mu-option>
        </mu-select>
      </mu-col>
    </mu-row>
  </mu-container>
</template>
<script>
export default {
  data () {
    return {
      citys: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ],
      custom: {
        value1: '',
        value2: []
      },
      languages: ['男生', '女生', 'php']
    }
  }
}
</script>