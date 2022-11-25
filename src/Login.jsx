import './Login.css';

function App() {
  return (
    <div className='rootPage'>
			<div id="login">
				<p className="login-title">👩‍💻TravelFootPrintsMap | by billSu👨‍💻</p>
				<div className="content userNameBox">
					<span>UserName</span>
					<input id="userName"  placeholder="请输入用户名" />
				</div>
				<div id="passwordBox">
					<span>PassWord</span>
					<input id="password" placeholder="请输入密码" />
				</div>
				<div className="login-button">
					<p style={{ textAlign: 'center' }}>登录</p>
				</div>
			</div>
		</div>
  );
}

export default App;
