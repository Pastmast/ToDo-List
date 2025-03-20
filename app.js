const { createApp, ref, reactive } = Vue;

createApp({
	setup() {
		const valueInput = ref('');
		const needDoList = reactive([]);
		const completeList = reactive([]);

		const handlyInput = (event) => {
			valueInput.value = event.target.value;
		};

		const addTask = () => {
			if (valueInput.value.trim() === '') {
				return;
			}
			needDoList.push({
				title: valueInput.value,
				id: Math.random(),
			});
			valueInput.value = '';
		};

		const doCheck = (index, type) => {
			if (type === 'need') {
				const completeMask = needDoList.splice(index, 1);
				completeList.push(...completeMask);
			} else {
				const noCompleteMask = completeList.splice(index, 1);
				needDoList.push(...noCompleteMask);
			}
		};

		const removeMask = (index, type) => {
			const toDoList = type === 'need' ? needDoList : completeList;
			toDoList.splice(index, 1);
		};

		return {
			valueInput,
			needDoList,
			completeList,
			handlyInput,
			addTask,
			doCheck,
			removeMask,
		};
	},
}).mount('#app');
