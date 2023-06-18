<template>
  <div class="homepage-ctn section">
    <div class="inner">
      <!-- <PromptBanner /> -->
      <div class="main-ctn come-up">
        <div class="col-ctn">
          <div class="row row-1">
            <div class="row-header">
              <h5>Prompt</h5>
              <p class="tokens">
                Tokens: {{  tokens  }}
              </p>
            </div>
            <div class="row-inner">
              <textarea v-model="prompt" />
            </div>
          </div>

          <div class="row">
            <h5>Inputs</h5>
            <div v-for="(inputField, index) in inputFields" v-show="inputField" :key="inputField" class="input-ctn">
              <!-- <div class="input-display">
                  {{  inputField  }}
                </div> -->
              <input v-model="inputValues[index]" :placeholder="inputField" type="text">
            </div>
            <div v-show="error" class="error-bar danger">
              Fill all inputs first
            </div>
          </div>
        </div>
        <div class="rows-ctn">
          <div class="row row-2">
            <div class="col col-2">
              <div class="row-header">
                <h5>Preview (Tokens: {{  refinedTokens  }})</h5>

              </div>

              <div class="prompt-display">
                {{  refinedPrompt  }}
              </div>
              <!-- <p class="tokens">
                Tokens: {{  refinedTokens  }}
              </p> -->
            </div>
          </div>
          <div class="row row-3">
            <div class="form-group bottom-row">
              <!-- <div class="form-group">
                <select>
                  <option value="GPT-3">
                    GPT-3.5 Turbo
                  </option>
                  <option value="Codex">
                    GPT-4
                  </option>
                </select>
                <div class="icon">
                  <ArrowDown />
                </div>
              </div> -->
              <div class="chip-group">
                <button @click="gptModel = 'gpt-3.5-turbo'" class="chip-btn"
                  :class="{ active: gptModel === 'gpt-3.5-turbo' }">
                  GPT-3.5 Turbo
                </button>
                <button @click="gptModel = 'gpt-4'" class="chip-btn" :class="{ active: gptModel === 'gpt-4' }">
                  GPT-4
                </button>
              </div>
              <!-- <div class="form-group">
                <select>
                  <option value="text-davinci-003">
                    text-davinci-003
                  </option>
                  <option value="text-curie-001">
                    text-curie-001
                  </option>
                  <option value="text-babbage-001">
                    text-babbage-001
                  </option>
                  <option value="text-ada-001">
                    text-ada-001
                  </option>
                </select>
                <div class="icon">
                  <ArrowDown />
                </div>
              </div> -->
            </div>
            <div class="actions">
              <!-- <button class="btn-link grayscale">
                SAVE
              </button> -->
              <button class="btn-link" @click="generateCompletion">
                RUN
                <div v-show="isLoading" class="loader" />
              </button>
            </div>
          </div>

        </div>
      </div>
      <div v-show="response" class="main-ctn completion-ctn response come-up">
        <div class="row row-1">
          <h5>Completion</h5>
          <p>
            {{  response  }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OpenAIApi, Configuration } from 'openai'
export default {
  name: 'HomePage',
  data() {
    return {
      error: false,
      openAI: null,
      isLoading: false,
      gptModel: 'gpt-3.5-turbo',
      response: '',
      inputValues: [],
      prompt: `Given the following fruit, output the closest color hex value that matches the color of that fruit.

Fruit:
{{ fruit }}

Color hex string:
`
    }
  },
  created() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    this.openAI = openai
  },
  computed: {
    tokens() {
      const words = this.prompt.split(/\s+/)
      let totalCharacters = 0
      for (const word of words) {
        totalCharacters += word.length
      }
      return Math.ceil(totalCharacters / 4)
    },
    refinedTokens() {
      const words = this.refinedPrompt.split(/\s+/)
      let totalCharacters = 0
      for (const word of words) {
        totalCharacters += word.length
      }
      return Math.ceil(totalCharacters / 4)
    },
    inputFields() {
      return this.getInputsInCurlyBraces(this.prompt)
    },
    refinedPrompt() {
      let tempPrompt = this.prompt
      for (let i = 0; i < this.inputFields.length; i++) {
        const inputField = this.inputFields[i]
        const inputValue = this.inputValues[i] || ''
        tempPrompt = tempPrompt.replaceAll(`{{${inputField}}}`, inputValue)
      }
      return tempPrompt
    }
  },
  methods: {
    isAllArrayElementsDefined(arr) {
      let bool = false
      for (const el of arr) {
        if (!el) {
          bool = false
          break
        }
        bool = true
      }
      return bool
    },
    async generateCompletion() {
      try {
        this.isLoading = true
        const chatCompletion = await this.openAI.createChatCompletion({
          model: this.gptModel,
          messages: [{ role: "user", content: "Hello world" }],
        });
        this.isLoading = false
        console.log(chatCompletion.data.choices[0].message);
      } catch (err) {
        this.isLoading = false
      }
    },
    generateMockResponse() {
      if (!this.isAllArrayElementsDefined(this.inputValues)) {
        this.error = true
      } else {
        this.error = false
        this.isLoading = true
        const mockResponses = [
          '#CECECE',
          '27 Inches wide',
          '34 pixels large',
          '#4192FF',
          '#F7CE22',
          '11 Inches Long',
          '89 rem equivalent',
          '32 rem equivalent',
          '#000000',
          '105 inches',
          '100rem x 24rem',
          '911 Inches wide',
          '#CECECE',
          '480rem x 95rem',
          '13vh equivalent',
          '#3F75FF'
        ]
        const randomIndex = Math.floor(Math.random(mockResponses.length) * mockResponses.length)
        setTimeout(() => {
          this.response = mockResponses[randomIndex]
          this.isLoading = false
        }, 1000)
      }
    },
    getInputsInCurlyBraces(prompt) {
      const regex = /\{\{(.*?)\}\}/g
      let matches = regex.exec(prompt)

      const results = []
      while (matches) {
        results.push(matches[1])
        matches = regex.exec(prompt)
      }

      return results
    }
  }
}
</script>

<style scoped>
.section {
  padding-top: 0;
}

.main-ctn {
  margin-top: 2rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}

.main-ctn>div {
  flex-basis: 48.5%;
}

.col-ctn {
  background: #3F75FF20;
  justify-content: space-between;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.col-ctn>div {
  flex-basis: 50%;
}

.row {
  padding: 1.5rem 2rem;
  background: #3F75FF20;
  /* background: #1c1827; */
  color: #979797;
}

.row-header {
  display: flex;
  justify-content: space-between;
}

.rows-ctn {
  border-radius: 6px;
  margin-bottom: 1.5rem;
  background: #f2f2f2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.row-2 {
  background: #f2f2f2;
  color: #4a4a4a;
}

.row-3 {
  background: rgb(247, 247, 247);
  color: #4a4a4a;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.row-3>div {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.row:nth-last-child(1) {
  border-bottom: 0;
}

/* MAIN PROMPT UI */
h5 {
  font-size: 0.85rem;
  font-weight: 500;
  color: #969696;
}

.rows-ctn h5 {
  margin-bottom: 0.5rem;
}

textarea {
  resize: none;
  outline: none;
  width: 100%;
  height: 290px;
  border-radius: 10px;
  color: #FFFFFF;
  background: #1c1827;
  margin: 1rem 0;
  padding: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
}

.row-1 {
  padding-bottom: 0;
}

.row-1 h5 {
  color: #1c1827;
}

.tokens {
  font-weight: 600;
}

.input-display {
  background: #3F75FF;
  color: #FFFFFF;
  padding: 0 1rem;
  border-radius: 15px;
  font-size: 0.8rem;
  height: 30px;
  display: inline-grid;
  place-items: center;
  margin-top: 1rem;
}

.bottom-row {
  display: flex;
  align-items: center;
}

.chip-group {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.chip-btn {
  background: #3F75FF10;
  border: 1px solid #3F75FF;
  color: #3F75FF;
  padding: 0 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  height: 40px;
  display: inline-grid;
  place-items: center;
  transition: 0.2s;
}

.chip-btn.active {
  background: #3F75FF;
  color: #FFFFFF;
}

.prompt-display {
  white-space: pre-line;
}

input {
  height: 50px;
  border-radius: 10px;
  margin: 1rem 0;
  width: 100%;
  padding: 0 1rem;
}

.form-group {
  margin-top: 0;
}

.form-group select {
  width: auto;
  padding-right: 3rem;
  outline: none;
}

.form-group .icon {
  transform: scale(1.5);
  transform-origin: center;
}

.btn-link {
  color: #3F75FF;
}

.btn-link:active {
  color: #FFFFFF;
}

.btn-link.grayscale {
  border: 1px solid grey;
}

/* COMPLETION */
.completion-ctn p {
  color: #1c1827;
  font-size: 1.2rem;
}

@media screen and (max-width: 800px) {
  .row {
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
  }

  .main-ctn {
    flex-direction: column;
  }

  .main-ctn>div {
    flex-basis: 100%;
  }
}
</style>
