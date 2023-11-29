InputView = {
	async readCourse() {
		const input = await Console.readLineAsync(
			"관리할 코스의 이름을 입력해주세요."
		);
		// ...
	},
	// ...
};

export default InputView;
