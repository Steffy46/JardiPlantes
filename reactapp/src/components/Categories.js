import React from 'react';
// import { Select, Radio } from 'antd';
import '../styles/Categories.css'


function Categories({ setActiveCategory, categories, activeCategory }) {
	return (
		<div className='jp-categories'>
			<select
				value={activeCategory}
				onChange={(e) => setActiveCategory(e.target.value)}
				className='es-categories-select'
			>
				<option value=''>Catégories des plantes</option>
				{categories.map((cat) => (
					<option key={cat} value={cat}>
						{cat}
					</option>
				))}
			</select>
			
			<button onClick={() => setActiveCategory('')}>Réinitialiser</button>
		</div>
	)
}

export default Categories