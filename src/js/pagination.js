import { refsGen } from './refs';
import { renderService } from './search-render-service';
import { eventsApiService } from './api-event-service';

const element = document.querySelector('.pagination__list');

export function createPagination(totalPages, page) {
  
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;

   if (totalPages>4 && page > 2) {
      liTag += `<li class="first numb"><span>1</span></li>`;
      if (totalPages>5 && page > 3) {
        liTag += `<li class="dots"><span>...</span></li>`;
      }
    }    
 
  if (totalPages > 2) {
    if (page === totalPages) {
      beforePage = beforePage - 2;
    } else if (page === totalPages - 1) {
      beforePage = beforePage - 1;
    }
    if (page === 1) {
      afterPage += 2;
    } else if (page === 2) {
      afterPage += 1;
    }
  }
 

  for (let plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      continue;
    }
    if (plength === 0) {
      plength += 1;
    }
    if (page === plength) {
      active = 'active';
    } else {
      active = '';
    }
    liTag += `<li class="numb ${active}"><span>${plength}</span></li>`;
  }

  if ( totalPages>4 && page < totalPages - 1) {
    if (totalPages > 5 && page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }

    liTag += `<li class="last numb"><span>${totalPages}</span></li>`;
  }

  // element.innerHTML = liTag;
  return liTag;
}

element.addEventListener('click', e => onClickPagination(e, refsGen));

function onClickPagination(e, ref) {
  eventsApiService.page = Number(e.target.textContent) - 1;
  renderService.resetAtPagination(ref);
  return renderService.fetchAndRenderEvents(ref);
}
