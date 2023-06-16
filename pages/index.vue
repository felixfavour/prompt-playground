<template>
  <div class="homepage-ctn section">
    <div class="inner">
      <!-- <PromptBanner /> -->
      <div class="main-ctn come-up-2">
        <div class="row row-1">
          <h5>Prompt</h5>
          <div class="row-inner">
            <textarea v-model="prompt" />
          </div>
          <p class="tokens">
            Tokens: {{ tokens }}
          </p>
        </div>
        <div class="row row-2">
          <div class="col col-1">
            <h5>Inputs</h5>
            <div v-for="(inputField, index) in inputFields" v-show="inputField" :key="inputField" class="input-ctn">
              <div class="input-display">
                {{ inputField }}
              </div>
              <input v-model="inputValues[index]" placeholder="Input value here" type="text">
            </div>
            <div v-show="error" class="error-bar danger">
              Fill all inputs first
            </div>
          </div>
          <div class="col col-2">
            <h5>Preview</h5>
            <div class="prompt-display">
              {{ refinedPrompt }}
            </div>
            <p class="tokens">
              Tokens: {{ refinedTokens }}
            </p>
          </div>
        </div>
        <div class="row row-3">
          <div class="form-group">
            <div class="form-group">
              <select>
                <option value="GPT-3">
                  GPT-3
                </option>
                <option value="Codex">
                  Codex
                </option>
              </select>
              <div class="icon">
                <ArrowDown />
              </div>
            </div>
            <div class="form-group">
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
            </div>
          </div>
          <div class="actions">
            <button class="btn-link grayscale">
              SAVE
            </button>
            <button class="btn-link" @click="generateMockResponse">
              RUN <div v-show="isLoading" class="loader" />
            </button>
          </div>
        </div>
      </div>
      <div v-show="response" class="main-ctn completion-ctn response come-up">
        <div class="row row-1">
          <h5>Completion</h5>
          <p>
            {{ response }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      error: false,
      isLoading: false,
      response: '',
      inputValues: [],
      prompt: `Given the following fruit, output the closest color hex value that matches the color of that fruit.

Fruit:
{{ fruit }}

Color hex string:
`
    }
  },
  computed: {
    tokens () {
      const tokens = this.prompt.split(/\s+/)
      let totalTokens = 0
      for (const token of tokens) {
        totalTokens += token.length
      }
      return totalTokens
    },
    refinedTokens () {
      const tokens = this.refinedPrompt.split(/\s+/)
      let totalTokens = 0
      for (const token of tokens) {
        totalTokens += token.length
      }
      return totalTokens
    },
    inputFields () {
      return this.getInputsInCurlyBraces(this.prompt)
    },
    refinedPrompt () {
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
    isAllArrayElementsDefined (arr) {
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
    generateMockResponse () {
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
          '#8352FF'
        ]
        const randomIndex = Math.floor(Math.random(mockResponses.length) * mockResponses.length)
        setTimeout(() => {
          this.response = mockResponses[randomIndex]
          this.isLoading = false
        }, 1000)
      }
    },
    getInputsInCurlyBraces (prompt) {
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
  .main-ctn {
    border-radius: 20px;
    margin-top: 2rem;
    overflow: hidden;
  }
  .row {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e4e4e4;
    background: #8352FF20;
    /* background: #1c1827; */
    color: #979797;
  }
  .row-2 {
    background: #f2f2f2;
    color: #4a4a4a;
    display: flex;
    justify-content: space-between;
  }
  .row-2 > div {
    flex-basis: 47.5%;
  }
  .row-3 {
    background: rgb(247, 247, 247);
    color: #4a4a4a;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .row-3 > div {
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
  .row-1 h5 {
    color: #1c1827;
  }
  .tokens {
    font-weight: 600;
  }
  .input-display {
    background: #8352FF;
    color: #FFFFFF;
    padding: 0 1rem;
    border-radius: 15px;
    font-size: 0.8rem;
    height: 30px;
    display: inline-grid;
    place-items: center;
    margin-top: 1rem;
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
    color: #8352FF;
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

  @media screen and (max-width: 600px) {
    .row {
      flex-direction: column;
      gap: 2rem;
    }
  }
</style>
