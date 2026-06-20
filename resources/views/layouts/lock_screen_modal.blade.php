<div class="modal fade" id="lockScreenModal" tabindex="-1" role="dialog" aria-labelledby="lockScreenModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="lockScreenModalLabel"><i class="fa fa-lock text-warning"></i> Screen Locked</h5>
            </div>
            <div class="modal-body text-center">
                <p>This screen has been locked by <strong>{{ getLoggedInUser() ? getLoggedInUser()->first_name : 'User' }}</strong></p>
                <form id="unlockScreenForm">
                    <div class="form-group">
                        <input type="password" name="password" id="unlockPassword" class="form-control" placeholder="Password" required autofocus>
                        <span id="unlockError" class="text-danger d-none form-text text-left mt-2">Incorrect password.</span>
                    </div>
                </form>
            </div>
            <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-primary" id="btnUnlockScreen">Unlock</button>
                <a href="{{ route('logout') }}" class="btn btn-light" onclick="event.preventDefault(); localStorage.clear(); document.getElementById('logout-form').submit();">Logout</a>
            </div>
        </div>
    </div>
</div>
