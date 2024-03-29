import React, {Component} from 'react'
import translationEN from '../locales/en/translation.json'
import translationES from '../locales/es/translation.json'


export const LanguageContext = React.createContext()


class LanguageProvider extends Component {

  storedLanguage = localStorage.getItem('UserLanguage')

  state = {
    language: this.storedLanguage && this.storedLanguage !== '' ? this.storedLanguage : 'EN',
  }

  changeLanguage = (lang) => {
    this.setState({
      language: lang
    })
    localStorage.setItem('UserLanguage', lang)
  }

  translate = (txtKey, nestKey) => {
    if (nestKey) {
      switch (this.state.language) {
          case 'EN':
            return translationEN[txtKey][nestKey]
        
          case 'ES':
            return translationES[txtKey][nestKey]
        
          default:
            return translationEN[txtKey][nestKey]
        }  
    } else {      
      switch (this.state.language) {
        case 'EN':
          return translationEN[txtKey]
          
        case 'ES':
          return translationES[txtKey]
        
        default:
          return translationEN[txtKey]
      }  
    }
  }

  render() {
    return(
      <LanguageContext.Provider
        value={
          {
            language: this.state.language,
            changeLanguage: this.changeLanguage,
            t: this.translate,
          }          
        }
      >
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}

export default LanguageProvider