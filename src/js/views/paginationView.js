import icons from 'url:../../img/icons.svg';
import View from './view.js'

class PaginationView extends View {
	_parentElement = document.querySelector('.pagination')

	_generateMarkup() {
		const currentPage = this._data.page

		const numberPage = Math.ceil(this._data.results.length / this._data.resultsPerPage)
		console.log(numberPage)

		if (currentPage === 1 && numberPage > 1) {
			return `<button class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
		}

		if (currentPage === numberPage && numberPage > 1) {
			return `<button class="btn--inline pagination__btn--prev">
				<svg class="search__icon">
					<use href="${icons}#icon-arrow-left"></use>
				</svg>
				<span>Page ${currentPage - 1}</span>
			</button>`
		}

		if (currentPage < numberPage) {
			return `<button class="btn--inline pagination__btn--prev">
				<svg class="search__icon">
					<use href="${icons}#icon-arrow-left"></use>
				</svg>
				<span>Page ${currentPage - 1}</span>
			</button>
			<button class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
      </button>
			`
		}

		return ''
	}
}

export default new PaginationView();

