if [[ "$1" ]]
then
    RULE="--rule $1"
fi

certoraRun certora/harness/AquaTokenV3Harness.sol:AquaTokenV3Harness \
    --verify AquaTokenV3Harness:certora/specs/delegate.spec \
    --packages openzeppelin-contracts=lib/openzeppelin-contracts \
    $RULE \
    --solc solc8.13 \
    --send_only \
    --optimistic_loop \
    --cloud \
    --msg "AquaTokenV3Harness:delegate.spec $1"
# --sanity

