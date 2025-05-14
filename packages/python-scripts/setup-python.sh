SCRIPT_DIR=$(dirname "$BASH_SOURCE")
echo "$SCRIPT_DIR/.python-env/bin/activate"
python3 -m venv "$SCRIPT_DIR/.python-env"
source "$SCRIPT_DIR/.python-env/bin/activate"
pip install -r "$SCRIPT_DIR/requirements.txt"
