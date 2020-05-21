import $ from 'jquery';

import countries from "i18n-iso-countries";
import langs_en from "i18n-iso-countries/langs/en.json";
countries.registerLocale(langs_en);
const langCountries = countries.getNames('en');

const allCountries = Object.keys(langCountries).map((code) => {
	return {
		name: langCountries[code],
		code: code
	};
});

let countrypicker = function(opts) {
	$(this).each(function(index, select) {
		var $select = $(select);

		var flag = $select.data('flag');

		var countries = allCountries;
		
		// filter countries of an option "data-countries" exist"
		var selectedCountries = $select.data('countries');
		if (selectedCountries && selectedCountries.length) {
			selectedCountries = selectedCountries.toUpperCase().split(',');
			countries = countries.filter(c => selectedCountries.includes(c.code));
		}

		var options = [];
		if (flag) {
				/* create option for each existing country */
				$.each(countries, function (index, country) {
					options.push(`<option
						data-tokens="${country.code} ${country.name}"
						data-icon="inline-flag flag ${country.code.toLowerCase()}"
						class="option-with-flag"
						value="${country.code}">${country.name}</option>`);
				});

		} else {
			//for each build list without flag
			$.each(countries, function (index, country) {
				options.push(`<option
					data-countrycode="${country.code}
					data-tokens="${country.code} ${country.name}"
					value="${country.code}">${country.name}</option>`);
			});
		}

		$select
			.addClass('f16')
			.html(options.join('\n'));

		//check if default
		var defaultCountryName = $select.data('default');
		//if there's a default, set it
		if (defaultCountryName) {
			$select.val(defaultCountryName.split(',').map((v) => v.trim()));
		}
	});
};

/* extend jQuery with the countrypicker function */
$.fn.countrypicker = countrypicker;

/* initialize all countrypicker by default. This is the default jQuery Behavior. */
$('.countrypicker').countrypicker();

/* return the countrypicker function for use as a module. */
export default countrypicker;
